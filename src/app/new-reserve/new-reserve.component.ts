import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { SectionReserve } from 'src/Types/viewsType';
import MinimalRoomData from 'src/Entity/MinimalRoomData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import MinimalGuest from 'src/Entity/MinimalGuest';
import { FormControl } from '@angular/forms';
import ValidateInputs from 'src/Entity/ValidateInputs';
import Reserve from 'src/Entity/Reserve';

@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.css']
})
@Injectable()
export class NewReserveComponent implements OnInit {
  @Input() sectionName: string;
  @Output() closeEmitter: EventEmitter<SectionReserve>;
  @Output() editEmitter: EventEmitter<SectionReserve>;
  selectedRoom?: MinimalRoomData;
  selectedGuest?: MinimalGuest;
  minimalList?: string;
  initReserve: FormControl<Date>
  endReserve: FormControl<Date>
  nPeoples: FormControl<number>
  observation: FormControl<string>

  constructor(private http: HttpClient) {
    this.sectionName = "";
    this.closeEmitter = new EventEmitter();
    this.editEmitter = new EventEmitter();
    this.initReserve = new FormControl();
    this.endReserve = new FormControl();
    this.nPeoples = new FormControl();
    this.observation = new FormControl();
  }

  ngOnInit(): void {
    document.getElementById("selectRoom")?.addEventListener("click", (event: MouseEvent) => {
      this.openMinimalList(event, "minimalRoomList");
    });
    document.getElementById("selectGuest")?.addEventListener("click", (event: MouseEvent) => {
      this.openMinimalList(event, "minimalGuestList");
    });
  }

  closeWindow(): void {
    this.closeEmitter.emit("RESERVE_LIST");
    if(this.minimalList){
      this.closeMinimalList(this.minimalList);
    }
  }

  closeMinimalList(listName: string): void {
    const divContent = document.getElementById(listName);
    this.minimalList = listName;
    console.log(listName);
    if(divContent){
      if(divContent.classList.contains("minimal-list")){
        divContent.classList.remove("minimal-list");
        divContent.classList.add("hidden");
      }
    }
  }

  spanwMinimalList(xPos: number, yPos: number, listName: string): void {
    const divContent = document.getElementById(listName);
    if(divContent){
      divContent.classList.remove("hidden");
      divContent.classList.add("minimal-list");
      divContent.style.position = "fixed";
      divContent.style.zIndex = "2";
      divContent.style.top = `${yPos.toString()}px`;
      divContent.style.left = `${xPos.toString()}px`;
      document.body.appendChild(divContent);
    }
  }

  // Revisáo
  openMinimalList(event: MouseEvent, listName: string): void {
    const spawnPosition = {
      x: event.x,
      y: event.y
    }

    this.spanwMinimalList(spawnPosition.x,spawnPosition.y, listName);
  }

  setRoom(room: MinimalRoomData): void {
    this.selectedRoom = room;
  }

  setGuest(guest: MinimalGuest): void {
    this.selectedGuest = guest;
  }

  showRoom(): string {
    if(this.selectedRoom){
      return `Quarto ${this.selectedRoom.number} - ${this.selectedRoom.acommodationName}`;
    }

    return "Selecione um Quarto";
  }

  showGuest(): string {
    if(this.selectedGuest){
      return `${this.selectedGuest.name}`;
    }

    return "Selecione um Hospede";
  }

  createNewReserve(): Reserve | void {
    const input = new ValidateInputs([
      { field: this.initReserve, validateWith: 'LARGER', compareTo: 7 },
      { field: this.endReserve, validateWith: 'LARGER', compareTo: 7 },
      { field: this.nPeoples, validateWith: 'LARGER', compareTo: 0 }
    ]);

    if(input.validate() && this.selectedGuest && this.selectedRoom){
      return new Reserve(this.initReserve.value, this.endReserve.value, this.nPeoples.value, this.selectedRoom.id,
        this.selectedGuest.id, 1, "Em espera", 0);
    }
  }

  sendPost(): void {
    const url = "api/reserve";
    const reserve = this.createNewReserve();
    if(reserve && this.selectedRoom && this.selectedGuest){
      const formData = new FormData();
      const reserveData = [
        {key: "entryDate", value: this.initReserve.value.toString()},
        {key: "checkoutDate", value: this.endReserve.value.toString()},
        {key: "amountPeople", value: this.nPeoples.value.toString()},
        {key: "roomId", value: this.selectedRoom.number.toString()},
        {key: "guestId", value: this.selectedGuest.id.toString()},
        {key: "observation", value: this.observation.value},
        {key: "employeeId", value: "1"},
        {key: "status", value: "Reservado"},
        {key: "checkInAmount", value: "0"},
        {key: "payment", value: "0"}
      ];

      for(let data of reserveData){
        formData.append(data.key, data.value);
      }

      const obsRequest = this.http.post(url, formData);

      obsRequest.subscribe({
        next: data => {
          alert(data.toString());
        }
      })
    }
  }
}
