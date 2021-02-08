import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-private-task',
  templateUrl: './private-task.component.html',
  styleUrls: ['./private-task.component.css']
})
export class PrivateTaskComponent implements OnInit {

  transaction: {}
  token: any;
  @Output() movimiento = new EventEmitter();
  userId: any;
  values: any;


  constructor(private authservice: AuthService, private fb: FormBuilder) { }

  transactionForm = this.fb.group({
    tipo: ['', Validators.required],
    valor: ['', Validators.required],
    rut_destino: ['', Validators.required],
    Banco: ['', Validators.required],
    tipo_cuenta: ['', Validators.required],
    Numero_cuenta: ['', Validators.required],
  });

  ngOnInit() {
    this.authservice.getUserId().subscribe(res => {
      console.log(res);

      this.values = Object.values(res);
      this.userId = this.values[0]._id;
    });
    
   
  }

  addTransaction() {
    this.authservice.transaction(this.transactionForm.value, this.userId)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);

        },
        err => {
          console.log(err)

        });
      
  }

}
