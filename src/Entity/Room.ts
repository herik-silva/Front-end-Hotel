class Room {
    id: number;
    number: number;
    accommodationId: number;
    imgBase64: string;
    status: string;

    constructor(id: number, number: number, accommodationId: number, imgBase64: string, status: string){
        this.id = id;
        this.number = number;
        this.accommodationId = accommodationId;
        this.imgBase64 = imgBase64;
        this.status = status;
    }
}

export default Room;