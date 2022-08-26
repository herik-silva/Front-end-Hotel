import { HttpClient } from '@angular/common/http';
import { Component, Injectable, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Guest from 'src/Entity/Guest';
import { SectionGuest } from 'src/Types/viewsType';
type GuestRow = {guest: Guest, row: {class: string}};

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
@Injectable()
export class GuestListComponent implements OnInit {
  private _newGuest: Guest | undefined;
  private _updateGuest: Guest | undefined;

  @Output() selectedGuestEmitter: EventEmitter<Guest>
  @Output() showInfoEmitter: EventEmitter<SectionGuest>

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

  constructor(private http: HttpClient) {
    this._newGuest = undefined;
    this._updateGuest = undefined;
    this.guestRowList = new Array();

    this.selectedGuest = undefined;

    this.selectedGuestEmitter = new EventEmitter();
    this.showInfoEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    this.loadGuest();
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

  loadGuest(): void {
    const url = "api/guest/all";
    const obsRequest = this.http.get<Array<any>>(url);

    obsRequest.subscribe({
      next: data => {
        console.warn("Lista de hospedes");
        for(let guest of data){
          const newGuest = new Guest(guest.name, guest.contactPhone, guest.cpf != "null" ? guest.cpf : "-", guest.city, guest.photo, guest.companyId, guest.id, guest.lastAccommodationId);
          const guestRow: GuestRow = {guest: newGuest, row: {class: ""}};
          console.log(guest);
          this.guestRowList.push(guestRow);  
        }
      }
    })
  }

  showInformation(): void {
    alert("ABRIR INFORMACOES");
    this.showInfoEmitter.emit("INFORMATION");
  }
}
