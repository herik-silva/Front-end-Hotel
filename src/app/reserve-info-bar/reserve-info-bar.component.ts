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
  @Output() checkinEmitter: EventEmitter<SectionReserve>;
  @Output() checkoutEmitter: EventEmitter<SectionReserve>;

  constructor() {
    this.showInfoEmitter = new EventEmitter();
    this.checkinEmitter = new EventEmitter();
    this.checkoutEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  getReserveInformation(): string {
    var message = "Sem informações";
    
    if(this.reserve){
      message = `${this.reserve.roomNumber} - ${this.reserve.guestName} - Telefone de Contato: ${this.reserve.celPhone}`;
    }

    return message;
  }

  showInformations(): void {
    if(this.reserve)
      this.showInfoEmitter.emit("INFORMATION");
  }

  emitCheckin(): void {
    console.log(this.reserve);
    if(this.reserve)
      this.checkinEmitter.emit("ALERT");
  }

  emitCheckout(): void {
    if(this.reserve)
      this.checkoutEmitter.emit("CHECKOUT")
  }
}