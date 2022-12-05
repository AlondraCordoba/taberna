export class ReservationModel {
  //_id?: string;
  _id?: number;
  name!: string;
  tickets!: number;
  date!: string;
  time!: string;
  disponible: boolean = true;
};
