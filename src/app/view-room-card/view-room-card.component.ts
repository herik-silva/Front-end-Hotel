import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Accommodation from 'src/Entity/Accommodation';
import Room from 'src/Entity/Room';
import { Section } from 'src/Types/viewsType';

@Component({
  selector: 'app-view-room-card',
  templateUrl: './view-room-card.component.html',
  styleUrls: ['./view-room-card.component.css']
})
export class ViewRoomCardComponent implements OnInit {

  @Input() room: Room | undefined;
  @Input() accommodationList: Array<Accommodation>;

  @Output() closeEventEmmiter: EventEmitter<Section>;
  @Output() editRoomEventEmitter: EventEmitter<Section>
  @Output() reserveRoomEventEmitter: EventEmitter<any>

  accommodation: Accommodation | undefined;

  statusClass: string;


  constructor() {
    this.closeEventEmmiter = new EventEmitter();
    this.editRoomEventEmitter = new EventEmitter();
    this.reserveRoomEventEmitter = new EventEmitter();

    this.statusClass = "";
    this.accommodationList = [];
  }

  ngOnInit(): void {
    if(this.room){
      this.getAccommodation(this.room.accommodationId);
      this.getStatus();
    }
  }

  getStatus() {
    if(this.room){
      switch(this.room.status){
        case "Livre":
          this.statusClass = "status free";
          break;

        case "Ocupado":
          this.statusClass = "status occupied"
      }
    }
  }

  getAccommodation(id: number) {
    this.accommodation = this.accommodationList.find((accommodation) => accommodation.id == id);
  }

  getFormatedPrice(): string {
    if(this.accommodation){
      const priceStringify = this.accommodation.dailyPrice.toFixed(2).replace(".",",");
      const formatedPrice = `R$ ${priceStringify}`;
  
      return formatedPrice;
    }

    return "Sem preço cadastrado!";
  }

  close() {
    this.closeEventEmmiter.emit("ROOM_LIST");
  }

  edit() {
    this.editRoomEventEmitter.emit("EDIT_ROOM");
  }
}
