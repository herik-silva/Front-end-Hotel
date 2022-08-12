import { Component, Injectable, Input, OnInit } from '@angular/core';
import RoomCard from 'src/Entity/RoomCard';
import Room from 'src/Entity/Room';
import { Section } from "src/Types/viewsType";
import Accommodation from 'src/Entity/Accommodation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
type room = {id: number, number: number, status: string, accommodationId: number, photo: string}


@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
@Injectable()
export class RoomViewComponent implements OnInit {
  sectionList;
  roomView: Array<RoomCard>;
  roomList: Array<RoomCard>;
  accommodationList: Array<Accommodation>;

  @Input() responsabilityId: number;

  selectedRoom: Room | undefined;
  selectedFilter: string;
  selectedSection: number;
  btnRemoveClass: string;

  constructor(private http: HttpClient) {
    this.selectedFilter = "Todos";
    this.roomList = [];
    this.roomView = this.roomList;
    this.accommodationList = [];
    this.btnRemoveClass = "hidden";
    this.sectionList = {
      NEW_ROOM: 0,
      INFORMATION: 1,
      ROOM_LIST: 2,
      REMOVE_ROOM: 3,
      EDIT_ROOM: 4,
      NEW_ACCOMMODATION: 5
    }
    this.responsabilityId = 0;
    this.selectedSection = this.sectionList.ROOM_LIST;
  }
  
  ngOnInit(): void {
    this.getAccommodations();
    this.getRooms();
  }

  checkAcessLevel(): boolean {
    if(this.responsabilityId<2){ // Abaixo de 2 sem acesso para criação de quartos
      return false;
    }

    return true;
  }

  getAccommodations() {
    const url = `api/accommodation/all`;
    const observableRequest = this.http.get<Accommodation | Array<Accommodation>>(url);

    observableRequest.subscribe({
      next: data => {
        if(data instanceof Array<Accommodation>){
          for(const accommodationData of data){
            const accommodation = new Accommodation(accommodationData.description, accommodationData.dailyPrice, accommodationData.id)
            this.accommodationList.push(accommodation);
          }
        }
      }
    })
  }

  getRooms() {
    const url = `api/room/all`;
    const observableRequest = this.http.get<room | Array<room>>(url);

    observableRequest.subscribe({
      next: data => {
        if(data instanceof Array<room>){
          for(const roomData of data){
            const room = new Room(roomData.id, roomData.number, roomData.accommodationId, roomData.photo, roomData.status);
            const roomCard = new RoomCard(room, undefined, undefined, room.status);
            this.roomList.push(roomCard);
          }
        }
        else{
          const room = new Room(data.id, data.number, data.accommodationId, data.photo, data.status);
          const roomCard = new RoomCard(room, undefined, undefined, room.status);
          this.roomList.push(roomCard);
        }
      }
    })
  }

  addNewRoom(newRoom: Room) {
    const roomCard = new RoomCard(newRoom, undefined, undefined, "Livre");
    this.roomList.push(roomCard);
    this.roomList.sort((roomA, roomB) => roomA.number - roomB.number);
  }

  editRoom(data: Array<any>) {
    const [lastNumber, room] = data;
    const index = this.roomList.findIndex((roomCard) => roomCard.number == lastNumber);

    this.roomList[index].number = room.number;
    this.roomList[index].accommodationId = room.accommodationId;
    this.roomList[index].imgBase64 = room.imgBase64;
    
    this.roomList.sort((roomA, roomB) => roomA.number - roomB.number);
  }

  /**
   * Filtra os quartos livres
   */
  filterToFree() {
    if(this.selectedFilter == "Livre"){
      this.selectedFilter = "Todos";
      this.roomView = this.roomList;
    }
    else{
      this.roomView = this.roomList.filter((roomCard) => roomCard.status == "Livre");
      this.selectedFilter = "Livre";
    }
  }
  
  /**
   * Filtra os quartos ocupados
   */
  filterToOccupied() {
    if(this.selectedFilter == "Ocupado"){
      this.selectedFilter = "Todos";
      this.roomView = this.roomList;
    }
    else{
      this.roomView = this.roomList.filter((roomCard) => roomCard.status == "Ocupado");
      this.selectedFilter = "Ocupado";
    }
  }

  selectSection(section: Section) {
    if(this.sectionList[section] != this.selectedSection) {
      this.selectedSection = this.sectionList[section];

      if(this.selectedSection == this.sectionList.REMOVE_ROOM){
        this.btnRemoveClass = "close";
      }
      else{
        this.btnRemoveClass = "hidden";
      }
    }
    else{
      this.selectedSection = this.sectionList.ROOM_LIST;
      this.btnRemoveClass ="hidden";
    }
  }

  showInformation(index: number) {
    const roomCard = this.roomView[index];
    this.selectedRoom = new Room(roomCard.id, roomCard.number, roomCard.accommodationId, roomCard.imgBase64, roomCard.status);
    this.selectSection("INFORMATION");
  }

  removeRoom(index: number) {
    console.log(this.roomList);
    console.log(this.roomView);

    const roomToRemove = this.roomView[index];

    const indexToRemove = this.roomList.findIndex((room) => room.number == roomToRemove.number);
    console.log(`Index remove: ${indexToRemove}`);
    console.log(this.roomList[indexToRemove])
    this.roomList.splice(indexToRemove, 1);
    this.roomView = this.roomList;
  
  }

  reserveRoom(index: number) {
    this.roomList[index].status = "Ocupado";
  }

  addAccommodation(newAccommodation: Accommodation) {
    this.accommodationList.push(newAccommodation);
    console.log(newAccommodation);
  }

  // CONTINUAR DEPOIS DA AUTENTICAÇÃO DO USUÁRIO
  sendDelete(index: number) {
    const url = `api/room/${index}`;

    this.http.delete(url, {
      headers: new HttpHeaders(
        {
          Accept: 'application/json',
        }
      )
    });
  }
}
