import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Guest from 'src/Entity/Guest';
import { SectionGuest } from 'src/Types/viewsType';

@Component({
  selector: 'app-guest-info-bar',
  templateUrl: './guest-info-bar.component.html',
  styleUrls: ['./guest-info-bar.component.css']
})
export class GuestInfoBarComponent implements OnInit {
  @Input() guest: Guest;
  @Output() infoEventEmitter: EventEmitter<SectionGuest>;

  constructor() {
    this.guest = Guest.genPlaceHolder("Selecione um Hospede na lista");
    this.infoEventEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  showInfo(): void {
    if(this.guest){
      this.infoEventEmitter.emit("INFORMATION");
    }
    else{
      alert("Selecione um Hospede na lista de hospedes para exibir suas informações.");
    }
  }
}
