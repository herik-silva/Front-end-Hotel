import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Guest from 'src/Entity/Guest';
import MinimalGuest from 'src/Entity/MinimalGuest';

@Component({
  selector: 'app-minimal-guest-list',
  templateUrl: './minimal-guest-list.component.html',
  styleUrls: ['./minimal-guest-list.component.css']
})
@Injectable()
export class MinimalGuestListComponent implements OnInit {
  inputValue: FormControl<string>;
  placeholder: string;
  minimalGuestList: Array<MinimalGuest>;
  minimalGuestListView: Array<MinimalGuest>;
  selected?: MinimalGuest;
  filterType: string;

  @Output() closeEmitter: EventEmitter<boolean>
  @Output() guestEmitter: EventEmitter<MinimalGuest>

  constructor(private http: HttpClient) {
    this.filterType = "name";
    this.minimalGuestList = new Array();
    this.placeholder = "Procure pelo nome do hospede";
    this.closeEmitter = new EventEmitter();
    this.guestEmitter = new EventEmitter();
    this.inputValue = new FormControl();
    this.minimalGuestListView = this.minimalGuestList;
  }

  ngOnInit(): void {
    this.getGuest();
    const button = document.getElementById(this.filterType);
    if(button) button.classList.add("selectedFilter");
  }

  select(index: number): void {
    if(this.selected){
      this.selected.className = "item";
    }

    this.selected = this.minimalGuestList[index];
    this.selected.className = "item selected";
  }

  close(): void {
    this.closeEmitter.emit(true);
  }

  emitGuest(): void {
    if(this.selected){
      this.guestEmitter.emit(this.selected);
      this.close();
    }
  }

  filter(key: KeyboardEvent): void {
    if(key.key == "Enter"){
      if(this.inputValue.value.length > 0){
        if(this.filterType == "name"){
          this.minimalGuestListView = this.minimalGuestList.filter(guest => guest.name.includes(this.inputValue.value));
          this.placeholder = "Procure pelo nome do hospede";
        }
        else{
          this.minimalGuestListView = this.minimalGuestList.filter(guest => guest.CPF.includes(this.inputValue.value));
          this.placeholder = "Procure pelo CPF";
        }
      }
      else{
        this.minimalGuestListView = this.minimalGuestList;
      }
    }
  }

  setFilterType(type: string): void {
    const button = document.getElementById(type);
    const lastButton = document.getElementById(this.filterType);
    if(button && lastButton){
      this.filterType = type;
      lastButton.classList.remove("selectedFilter");
      button.classList.add("selectedFilter");
    }

    // Alterando texto de exibição do input
    if(type == "number"){
      this.placeholder = "Procure pelo nome do Hospede";
    }
    else{
      this.placeholder = "Procure pela CPF";
    }
  }

  getGuest(): void {
    const url = "/api/guest/all";

    const obsResponse = this.http.get<Array<any>>(url);
    
    obsResponse.subscribe({
      next: data => {
        for(let guest of data){
          const MinimalGuest = {
            id: guest.id,
            CPF: guest.cpf,
            name: guest.name,
            urlImage: guest.photo,
            className: "item"
          } as MinimalGuest;
          this.minimalGuestList.push(MinimalGuest);
        }
      }
    })
  }
}
