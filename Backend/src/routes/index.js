const { Router } = require('express');
const router = Router();
const logger = require('../config/logger/logger')('database');

const User = require('../models/user');
const transaccion = require('../models/transactions');

const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');

router.get('/', (req, res) => {
	res.send('hello')
});

router.post('/signup', async (req, res) => {
	const { nombre, rut, email, password } = req.body;
	const newUser = new User({ nombre, rut, email, password });
	const rutExists = await verifyRutExists(rut);

	if (!!rutExists) {
		return res.status(401).send('El rut ya esta registrado');
	} else {
		await newUser.save();
		const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
		res.status(200).json({ token });
	}

});

router.post('/signin', async (req, res) => {
	const { rut, password } = req.body;

	const user = await User.findOne({ rut });
	console.log('user', user)
	if (!user) return res.status(401).send('No esta registrado');
	if (user.password !== password) return res.status(401).send('Contraseña erronea');

	const token = jwt.sign({ _id: user._id }, 'secretkey');

	return res.status(200).json({ token });
});

router.get('/task', verifyToken, (req, res) => {
	res.json({

	})

});

router.post('/transaction', verifyToken, async (req, res) => {
	logger.silly(`addMoney - req.body ${JSON.stringify(req.body, null, 2)}`);
	const { tipo, valor, rut_destino, Banco, tipo_cuenta, Numero_cuenta } = req.body.transaction

	const user_id = req.body.userId

	if (tipo === 'Transferencia') {
		const newAbono = new transaccion({ user_id, tipo, valor, rut_destino, Banco, tipo_cuenta, Numero_cuenta });
		await newAbono.save();
		logger.silly(`addMoney - valor ${JSON.stringify(newAbono, null, 2)}`);
	} else {
		const newAbono = new transaccion({ user_id, tipo, valor });
		await newAbono.save();
		logger.silly(`addMoney - valor ${JSON.stringify(newAbono, null, 2)}`);
	}

});

router.get('/userId', verifyToken, async (req, res) => {
	const _id = res.locals._id

	const userId = await User.findOne({ _id: _id });

	logger.silly(`userId ${JSON.stringify(userId, null, 2)}`);

	res.locals.user_id = userId._id;

	return res.status(200).json({ userId });
});


router.get('/getGiros', async (req, res) => {
	const transactions = await getTransacciones();
	const Giros = transactions.filter(trans => trans.tipo == "Giro")
	logger.silly(`Giro ${JSON.stringify(Giros, null, 2)}`);
	return res.status(200).json(Giros);

});

router.get('/getAbonos', async (req, res) => {
	const transactions = await getTransacciones();
	const Abonos = transactions.filter(trans => trans.tipo == "Abono")
	logger.silly(`Abonos ${JSON.stringify(Abonos, null, 2)}`);
	return res.status(200).json(Abonos);

});

router.get('/Transferencias', async (req, res) => {
	const transactions = await getTransacciones();
	const Transferencias = transactions.filter(trans => trans.tipo == "Transferencia")
	logger.silly(`Transferencias ${JSON.stringify(Transferencias, null, 2)}`);
	return res.status(200).json(Transferencias);

});


const getTransacciones = async function (id) {
	try {
		const transactions = await transaccion.find({});
		logger.silly(`getTransacciones -transactions ${JSON.stringify(transactions, null, 2)}`);
		return transactions

	} catch (error) {
		throw (error);
	}
}


module.exports = router;


async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;

		res.locals._id = req.userId;

		next();
	} catch (e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

async function verifyRutExists(rut) {
	const rutExists = await User.findOne({ rut });

	if (rutExists) {
		return true
	} else {
		return false
	}
}


