import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Services
import { ScriptsService } from './services/scripts.service';
import { AppService } from './services/app.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Para trabajar con formularios.
import { FormsModule } from '@angular/forms';
// Para manejar/trabajar los formularios de manera reactiva.(formularios reactivos).
import { ReactiveFormsModule } from '@angular/forms';
// Para hacer peticiones HTTP es necesario importar ClientModule.
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ScriptsService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
