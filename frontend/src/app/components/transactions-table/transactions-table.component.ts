import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})

export class TransactionsTableComponent implements OnInit {

  movimientos: any;
  public giros: any;
  public abonos: any;
  public totalGiros: any;
  public totalAbonos: any;
  total: any;
  girosMas: any;

  user:any
  values:any;

  constructor(private authService: AuthService) { }

    getUser(){
      this.authService.getUserId().subscribe(res=>{
        this.values = Object.values(res);
        this.user = this.values[0]._id;
      })
    }

     ngOnInit() {

      this.authService.getGiros().subscribe((res: any) => {
      this.giros = res;
      this.totalGiros = this.giros.reduce((sum, value) => (typeof value.valor == "number" ? sum + value.valor : sum), 0);

      this.totalGiros = this.totalGiros['totalGiros'];
    });

      this.authService.getAbonos().subscribe((res: any) => {
      this.abonos = res;
      this.totalAbonos = this.abonos.reduce((sum, value) => (typeof value.valor == "number" ? sum + value.valor : sum), 0);
    });

    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'ClP',
      minimumFractionDigits: 0
    });

    this.total = parseInt(this.totalGiros) - parseInt(this.totalAbonos)

    // this.total = formatter.format(this.total);

  }
  // totalMovimientos() {
  //   const formatter = new Intl.NumberFormat('es-CL', {
  //     style: 'currency',
  //     currency: 'ClP',
  //     minimumFractionDigits: 0
  //   });

  //   this.total = this.totalAbonos - this.totalGiros

  //   this.total = formatter.format(this.total);

  // }






}
