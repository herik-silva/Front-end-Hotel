import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ReserveView from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-reserve-info-bar',
  templateUrl: './reserve-info-bar.component.html',
  styleUrls: ['./reserve-info-bar.component.css']
})
export class ReserveInfoBarComponent implements OnInit {
  @Input() reserve?: ReserveView;

  @Output() showInfoEmitter: EventEmitter<SectionReserve>;

  constructor() {
    this.showInfoEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  getReserveInformation(): string {
    var message = "Sem informações";
    
    if(this.reserve){
      message = `${this.reserve.roomNumber} - ${this.reserve.guestName}`;
    }

    return message;
  }

  showInformations(): void {
    if(this.reserve)
      this.showInfoEmitter.emit("INFORMATION");
  }
}