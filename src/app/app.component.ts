import { Component, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from './services/scripts.service';
import { AppService } from './services/app.service';
import Swal from 'sweetalert2';
import { ReservationModel } from './models/reservation.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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
  fGValid: FormGroup = new FormGroup({});
  @Output() salida = new EventEmitter();
  email: string = '';
  nombre: string = '';

  constructor(private _scripts: ScriptsService, public appService: AppService,  private fb: FormBuilder) {
    _scripts.carga(["main"])
  }

  buildForm(){
    this.fGValid= this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      nombre: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      boletosReservados: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  get obtainFGValidator(){
    return this.fGValid.controls;
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
      let numeros: string = '0123456789';
      let letras = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
      let simbolos = '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~';
      ​let sCadena = (numeros + letras + simbolos + this.ticket._id + this.ticket.telefono)
      //Obtenemos largo
      let lCadena = sCadena.length
      //extraemos elementos aletarioamente de la sCadena
      let MiCadena = '';
      for (let i = 0; i < 16; i++) {
        MiCadena += sCadena.charAt(Math.floor(Math.random() * lCadena));
      }
      //pasamos datos al resultado
      console.log(MiCadena);
      Toast.fire('Reservación realizada', `Tú código de reserva es: ${MiCadena}`, 'success');
      this.salida.emit();
      console.log(this.ticket);
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.message, '', 'error');
      this.salida.emit();
    });
  }

}
