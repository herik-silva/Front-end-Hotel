class ReserveDate {
    private initDate: Date;
    private endDate: Date;

    constructor(init: Date, end: Date) {
        this.initDate = init;
        this.endDate = end;
    }

    public setInitDate(newDate: Date) {
        this.initDate = newDate;
    }

    public getInitDate(): Date {
        return this.initDate;
    }

    public setEndDate(newDate: Date) {
        this.endDate = newDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public formatDate(): string {
        const formatedDate = `${this.initDate.toLocaleDateString("pt-BR")} - ${this.endDate.toLocaleDateString("pt-BR")}`;
        return formatedDate;
    }
}

export default ReserveDate;