import ReserveDate from "./ReserveDate";
import Room from "./Room";

class RoomCard extends Room {
    reserveDate: ReserveDate | undefined;
    guest: any;

    constructor(room: Room, reserveDate: ReserveDate | undefined, guest: any, status: string) {
        super(room.id, room.number, room.accommodationId, room.imgBase64, room.status);
        this.reserveDate = reserveDate;
        this.guest = guest;
        this.status = status;
    }

    formateReserveDate(): string {
        if(this.reserveDate){
            return this.reserveDate.formatDate();
        }

        return "";
    }

    guestName(): string {
        return '';
    }
}

export default RoomCard;