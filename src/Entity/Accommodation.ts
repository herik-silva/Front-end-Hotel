class Accommodation {
    id: number | undefined;
    description: string;
    dailyPrice: number;

    constructor(description: string, dailyPrice: number, id: number | undefined = undefined){
        this.id = id;
        this.description = description;
        this.dailyPrice = dailyPrice;
    }
}

export default Accommodation;