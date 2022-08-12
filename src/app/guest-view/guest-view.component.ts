import { Component, OnInit } from '@angular/core';
import Guest from 'src/Entity/Guest';
import { SectionGuest } from 'src/Types/viewsType';

type GuestRow = {guest: Guest, row: {class: string}};

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit {
  newGuest: Guest | undefined;
  updateGuest: Guest | undefined;
  selectedGuest: Guest;
  section: number;
  sectionList;

  constructor() {
    this.newGuest = undefined;
    this.updateGuest = undefined;

    this.selectedGuest = Guest.genPlaceHolder("Selecione um Hospede na lista");
    this.sectionList = {
      NEW_GUEST: 0,
      INFORMATION: 1,
      EDIT_GUEST: 2,
      REMOVE_GUEST: 3,
      GUEST_LIST: 4,
    }
    this.section = this.sectionList.GUEST_LIST;
  }

  ngOnInit(): void {
  }

  getNewGuest(): Guest | undefined {
    if(this.newGuest)
      return this.newGuest;

    return undefined;
  }

  setSelectedGuest(guest: Guest) {
    this.selectedGuest = guest;
  }

  setSection(section: SectionGuest) {
    this.section = this.sectionList[section];
  }

  addNewGuest(guest: Guest) {
    this.newGuest = guest;
    console.log(guest);
  }

  updateGuestData(guest: Guest) {
    this.updateGuest = guest;
  }
}
