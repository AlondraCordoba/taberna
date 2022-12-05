export class ReservationModel {
    //_id?: string;
    _id?: number;
    name!: string;
    tickets!: number;
    date!: string;
    phone!: string;
    email!: string;
    time!: string;
    disponible: boolean = true;
};
