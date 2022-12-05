export class ReservationModel {
    //_id?: string;
    _id?: number;
    nombre!: string;
    boletosReservados!: number;
    totalPago!: 150;
    telefono!: number;
    email!: string;
    disponible: boolean = true;
};
