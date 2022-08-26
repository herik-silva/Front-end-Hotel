import People from "./People";

class Guest extends People {
    private id: number | undefined;
    private companyId: number | undefined;
    private lastAcommodationId: number;
    private city: string

    constructor(name: string, contactPhone: string, 
            cpf: string, city: string, 
            photo: string | undefined = undefined,
            company: number | undefined = undefined,
            id: number | undefined = undefined, 
            lastAccommodationId: number = 1
        ){
        super(name, cpf, contactPhone, photo);

        this.id = id;
        this.companyId = company;
        this.lastAcommodationId = lastAccommodationId;
        this.city = city;
    }

    static genPlaceHolder(name: string): Guest {
        const placeHolder = new Guest(name, "", "", "");
        return placeHolder;
    }

    getId(): number {
        if(this.id)
            return this.id;

        return -1;
    }

    getCompany(): number | void {
        if(this.companyId)
            return this.companyId;
    }

    getLastAccommodationId(): number {
        return this.lastAcommodationId;
    }

    getCity(): string {
        return this.city;
    }

    setCompany(newCompany: number): void {
        this.companyId = newCompany;
    }
    
    setLastAccommodationId(newId: number): void {
        this.lastAcommodationId = newId;
    }

    setCity(newCity: string): void {
        this.city = newCity;
    }
}

export default Guest;