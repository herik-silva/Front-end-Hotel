class Reserve {
    private reserveId?: number;
    private entryDate: Date;
    private checkOutDate: Date;
    private amountPeople: number;
    private roomId: number;
    private guest: number;
    private employee: number;
    private status: string;
    private checkinAmount: number;

    constructor(entryDate: Date, checkOutDate: Date, amountPeople: number, roomId: number, guest: number, employee: number, status: string, checkinAmount: number, id: number | undefined = undefined) {
        this.reserveId = id;
        this.entryDate = entryDate;
        this.checkOutDate = checkOutDate;
        this.amountPeople = amountPeople;
        this.roomId = roomId;
        this.guest = guest;
        this.employee = employee;
        this.status = status;
        this.checkinAmount = checkinAmount;
    }

    getReserveId(): number | void {
        if(this.reserveId) return this.reserveId;
    }

    getEntryDate(): Date {
        return this.entryDate;
    }

    getCheckOutDate(): Date {
        return this.checkOutDate;
    }

    getAmountPeople(): number {
        return this.amountPeople;
    }

    getroomIdNumber(): number {
        return this.roomId;
    }

    getGuestId(): number {
        return this.guest;
    }

    getEmployeeId(): number {
        return this.employee;
    }

    getStatus(): string {
        return this.status;
    }

    getCheckinAmout(): number {
        return this.checkinAmount;
    }

    setReserveId(reserveId: number): void {
        this.reserveId = reserveId;
    }

    setEntryDate(newDate: Date): void {
        this.entryDate = newDate;
    }

    setCheckOutDate(newDate: Date): void {
        this.checkOutDate = newDate;
    }

    setAmountPeople(amoutPeople: number): void {
        this.amountPeople = amoutPeople;
    }

    setRoomId(newRoomId: number): void {
        this.roomId = newRoomId;
    }

    setGuestId(newGuest: number): void {
        this.guest = newGuest;
    }

    setEmployeeId(newEmployee: number): void {
        this.employee = newEmployee;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    makeCheckin(): void {
        this.checkinAmount++;
    }
}

export default Reserve;