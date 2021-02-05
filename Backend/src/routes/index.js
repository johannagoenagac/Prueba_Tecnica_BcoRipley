const { Router } = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async (req, res) => {
    const { rut, email, password } = req.body;
    const newUser = new User({rut, email, password});
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { rut, password } = req.body;

    const user = await User.findOne({rut});
    if (!user) return res.status(401).send('No esta registrado');
    if (user.password !== password) return res.status(401).send('Contraseña erronea');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/task', verifyToken,  (req, res) => {
    res.json({
      
    })

    
})


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
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}