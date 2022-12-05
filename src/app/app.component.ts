import { Component, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from './services/scripts.service';
import { AppService } from './services/app.service';
import { FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReservationModel } from './models/reservation.model';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taberna-website';
  form!: FormGroup;
  ticket: ReservationModel = new ReservationModel();
  @Output() salida = new EventEmitter();

  constructor(private _scripts: ScriptsService, public appService: AppService) {
    _scripts.carga(["main"])
  }
  contactForm(form: any) {
    this.appService.sendMessage(form).subscribe(() => {
      window.alert("Mensaje enviado correctamente");
    });
  }

  ticketForm(form: any) {
    this.appService.getEvents().subscribe(() => {
      window.alert("Mensaje enviado correctamente");
    });
  }

  buyTicket(form: NgForm){
    this.appService.buyTickets(this.ticket).then((resp: any) => {
      Toast.fire(resp.message, '', 'success');
      this.salida.emit();
      console.log(this.ticket);
      this.form.reset();

      let numeros: string = '0123456789';
      let letras = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
      let simbolos = '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~';
      ​let sCadena = (numeros + letras + simbolos + this.ticket._id + this.ticket.phone)
      //Obtenemos largo
      let lCadena = sCadena.length
      //extraemos elementos aletarioamente de la sCadena
      let MiCadena = '';
      for (let i = 0; i < 16; i++) {
        MiCadena += sCadena.charAt(Math.floor(Math.random() * lCadena));
      }
      //pasamos datos al resultado
      return MiCadena;
      console.log(MiCadena);
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.message, '', 'error');
      this.salida.emit();
    });
  }

}
