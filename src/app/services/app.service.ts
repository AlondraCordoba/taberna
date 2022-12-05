import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  sendMessage(body: any) {
    return this.http.post('http://localhost:3000/contact-form', body);
  }

  getEvents() {
    return this.http.get('https://web-production-ce2a.up.railway.app/events');
  }

  buyTickets(ticket: ReservationModel) {
    return this.http.post('https://web-production-ce2a.up.railway.app/reservs', ticket).toPromise();
  }
}
