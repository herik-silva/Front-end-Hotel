import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Guest from 'src/Entity/Guest';
import { SectionGuest } from 'src/Types/viewsType';

type Company = {id: number, name: string};

@Component({
  selector: 'app-info-guest',
  templateUrl: './info-guest.component.html',
  styleUrls: ['./info-guest.component.css']
})

export class InfoGuestComponent implements OnInit {

  @Input() guest: Guest;

  @Output() closeEventEmitter: EventEmitter<SectionGuest>
  @Output() editEventEmitter: EventEmitter<SectionGuest>;

  companies: Array<Company>;

  constructor() {
    this.guest = new Guest("Fulano Alberto", ["37 9954-4412"], "136.664.346-98", "Bambuí");
    this.companies = [
      {
        id: 0,
        name: "Empresa A"
      },
      {
        id: 1,
        name: "Empresa B"
      }
    ];

    this.closeEventEmitter = new EventEmitter();
    this.editEventEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  close(): void {
    this.closeEventEmitter.emit("GUEST_LIST");
  }

  getCompanyName(): string | undefined {
    const selectedCompany = this.companies.find((company) => {
      if(this.guest.getCompany() && this.guest.getCompany() == company.id){
        return company;
      }
      else{
        return undefined;
      }
    });

    if(selectedCompany){
      return selectedCompany.name;
    }
    else{
      return undefined;
    }
  }

  editGuest(): void {
    this.editEventEmitter.emit("EDIT_GUEST");
  }
}
