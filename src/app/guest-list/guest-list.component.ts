import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Guest from 'src/Entity/Guest';
type GuestRow = {guest: Guest, row: {class: string}};

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  private _newGuest: Guest | undefined;
  private _updateGuest: Guest | undefined;

  @Output() selectedGuestEmitter: EventEmitter<Guest>

  @Input() set newGuest(guest: Guest | undefined) {
    this._newGuest = guest;
    console.log(this._newGuest);
    if(this._newGuest){
      this.guestRowList.push({ guest: this._newGuest, row: {class: ""} });
    }
  }

  get guestList(): Guest | undefined {
    if(this.newGuest)
      return this._newGuest;

    return undefined;
  }

  @Input() set updateGuest(guest: Guest | undefined) {
    if(guest){
      const guestIndex = this.guestRowList.findIndex((guestRow) => guestRow.guest.getCpf() == guest.getCpf())
      this.guestRowList[guestIndex].guest = guest;
    }
  }

  get updateGuest(): Guest | undefined {
    if(this.updateGuest)
      return this._updateGuest;

    return undefined;
  }


  guestRowList: Array<GuestRow>;

  selectedGuest: GuestRow | undefined;

  constructor() {
    this._newGuest = undefined;
    this._updateGuest = undefined;
    this.guestRowList = new Array();

    this.selectedGuest = undefined;

    this.selectedGuestEmitter = new EventEmitter();
  }

  ngOnInit(): void {

    // for(const guest of this.guestList){
    //   const guestRow = {guest: guest, row: {class: ""}} as GuestRow;
    //   this.guestRowList.push(guestRow);
    // }
  }

  emitGuest(guest: Guest) {
    this.selectedGuestEmitter.emit(guest);
  }

  selectGuest(index: number) {
    if(this.selectedGuest){
        this.selectedGuest.row.class = "";
    }

    this.selectedGuest = this.guestRowList[index];
    this.selectedGuest.row.class = "selected";

    this.emitGuest(this.selectedGuest.guest);
  }
}
