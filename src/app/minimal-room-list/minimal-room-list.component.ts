import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Accommodation from 'src/Entity/Accommodation';
import MinimalRoomData from 'src/Entity/MinimalRoomData';

type room = {id: number, number: number, status: string, accommodationId: number, photo: string}

@Component({
  selector: 'app-minimal-room-list',
  templateUrl: './minimal-room-list.component.html',
  styleUrls: ['./minimal-room-list.component.css']
})
@Injectable()
export class MinimalRoomListComponent implements OnInit {
  inputValue: FormControl<string>;
  placeholder: string;
  minimalRoomList: Array<MinimalRoomData>;
  minimalRoomListView: Array<MinimalRoomData>;
  selected?: MinimalRoomData;
  filterType: string;
  accommodationList: Array<Accommodation>;

  @Output() closeEmitter: EventEmitter<boolean>
  @Output() roomEmitter: EventEmitter<MinimalRoomData>

  constructor(private http: HttpClient) {
    this.filterType = "number";
    this.accommodationList = new Array();
    this.minimalRoomList = new Array();
    this.placeholder = "Procure pelo número do quarto";
    this.closeEmitter = new EventEmitter();
    this.roomEmitter = new EventEmitter();
    this.inputValue = new FormControl();
    this.minimalRoomListView = this.minimalRoomList;
  }

  ngOnInit(): void {
    this.getAccommodations();
    const button = document.getElementById(this.filterType);
    if(button) button.classList.add("selectedFilter");
  }

  select(index: number): void {
    if(this.selected){
      this.selected.className = "item";
    }

    this.selected = this.minimalRoomList[index];
    this.selected.className = "item selected";
  }

  close(): void {
    this.closeEmitter.emit(true);
  }

  emitRoom(): void {
    if(this.selected){
      this.roomEmitter.emit(this.selected);
      this.close();
    }
  }

  filter(key: KeyboardEvent): void {
    if(key.key == "Enter"){
      if(this.inputValue.value.length > 0){
        if(this.filterType == "number"){
          this.minimalRoomListView = this.minimalRoomList.filter(room => room.number == parseInt(this.inputValue.value));
          this.placeholder = "Procure pelo número do quarto";
        }
        else{
          this.minimalRoomListView = this.minimalRoomList.filter(room => room.acommodationName.includes(this.inputValue.value));
        }
      }
      else{
        this.minimalRoomListView = this.minimalRoomList;
      }
    }
  }

  setFilterType(type: string): void {
    const button = document.getElementById(type);
    const lastButton = document.getElementById(this.filterType);
    if(button && lastButton){
      this.filterType = type;
      lastButton.classList.remove("selectedFilter");
      console.log(lastButton)
      button.classList.add("selectedFilter");
    }

    // Alterando texto de exibição do input
    if(type == "number"){
      this.placeholder = "Procure pelo número do quarto";
    }
    else{
      this.placeholder = "Procure pela acomodação";
    }
  }

  getRooms(): void {
    const url = "/api/room/livre";

    const obsResponse = this.http.get<Array<room>>(url);
    
    obsResponse.subscribe({
      next: data => {
        for(let room of data){
          const minimalRoomData = {
            id: room.id,
            acommodationName: this.accommodationList.find(accommodation => accommodation.id == room.accommodationId)?.description,
            number: room.number,
            urlImage: room.photo,
            className: "item"
          } as MinimalRoomData;
          this.minimalRoomList.push(minimalRoomData);
        }
      }
    })
  }

  getAccommodations(): void {
    const url = "/api/accommodation/all";
    const obsResponse = this.http.get<Array<Accommodation>>(url);
    
    obsResponse.subscribe({
      next: data => {
        for(let accommodation of data){
          this.accommodationList.push(accommodation);
        }
        this.getRooms();
      }
    })
  }
}
