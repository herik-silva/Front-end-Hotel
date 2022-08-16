interface ReserveView {
    reserveId: number;
    entryDate: Date;
    checkIn?: Date;
    checkOut?: Date;
    checkInAmount: number;
    amountPeople: number;
    roomNumber: number;
    roomPhoto: string;
    guestId: number;
    guestName: string;
    guestPhoto: string;
    employeeId: number;
    employeeName: string;
    observation: string;
    celPhone: string;
}

export default ReserveView;