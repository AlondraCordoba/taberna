import { Component } from '@angular/core';
import { ScriptsService } from './services/scripts.service';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taberna-website';
  constructor ( private _scripts: ScriptsService, public _appService: AppService){
    _scripts.carga(["main"])
  }
  contactForm(form: any) {
    this._appService.sendMessage(form).subscribe(() => {
    window.alert("Mensaje enviado correctamente");
    });
    }

}
