import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import ReserveView from 'src/Entity/ReserveView';
import Reserve from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

type ReserveRow = { reserve: Reserve, row: { class: string } };

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css']
})
@Injectable()
export class ReserveListComponent implements OnInit {
  private _filter?: string;
  private aux?: Array<any>;

  @Input() set filter(filter: string) {
    this._filter = filter;
    this.reserveListView = this.reserveList.filter(reserveRow => reserveRow.reserve.guestName.includes(filter));
  }

  @Input() set updateList(update: boolean) {
    this.reserveList = [];
    this.getReserves();
  }

  @Input() set newReserve(newReserve: ReserveView | undefined) {
    if(newReserve)
      this.reserveList.push({reserve: newReserve, row: {class: ""}});
  }

  @Output() reserveEmitter: EventEmitter<Reserve>;
  @Output() checkinEmitter: EventEmitter<SectionReserve>;
  @Output() showInfoEmitter: EventEmitter<SectionReserve>;

  reserveList: Array<ReserveRow>;
  reserveListView: Array<ReserveRow>;
  selectedReserve?: ReserveRow;

  constructor(private http: HttpClient) {
    this.reserveList = new Array();
    this.reserveListView = this.reserveList;
    this.reserveEmitter = new EventEmitter();
    this.showInfoEmitter = new EventEmitter();
    this.checkinEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    this.getReserves();
    document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  }

  private emitSelectedReserve(reserveToEmit: Reserve) {
    this.reserveEmitter.emit(reserveToEmit);
  }

  select(index: number) {
    if(this.selectedReserve){
      this.selectedReserve.row.class = "";
    }

    this.selectedReserve = this.reserveListView[index];
    this.selectedReserve.row.class = "selected";
    this.emitSelectedReserve(this.selectedReserve.reserve);
  }

  getValidString(value: string | Date | undefined): string {
    if(value){
      if(typeof value == "string"){
        return value.length > 0 ? value : "-";
      }
  
      return value ? value.toDateString() : "-";
    }

    return "-";
  }

  getReserves(): void {
    const url = "api/reserve/all";
    const obsRequest = this.http.get<ReserveView | Array<ReserveView>>(url);
    console.log("Requisição feita");
    obsRequest.subscribe({
      next: data => {
        console.log(data);
        if(data instanceof Array<ReserveView>){
          for(let reserveView of data){
            this.reserveList.push({reserve: reserveView, row: {class: ""}});
            console.log(reserveView);
          }

          this.reserveList.sort((a, b) => {
            if(a.reserve.roomNumber > b.reserve.roomNumber){
              return 1;
            }
            else if(a.reserve.roomNumber < b.reserve.roomNumber){
              return -1;
            }
            else{
              return 0;
            }
          });

          this.reserveListView = this.reserveList;
        }
      }
    });
  }

  showInformations(): void {
    this.showInfoEmitter.emit("INFORMATION");
  }

  showCheckin(index: number): void {
    this.select(index); // Seleciona a reserva

    if(this.selectedReserve){
      if(this.selectedReserve.reserve.lastCheckin){ // Caso já foi feito um checkin, deve verificar se é outro dia.
        const lastCheckin = new Date(this.selectedReserve.reserve.lastCheckin.toString()).toLocaleDateString("pt-BR");
        if(lastCheckin != new Date().toLocaleDateString("pt-BR")){
          this.checkinEmitter.emit("ALERT");
        }
        else{
          alert("Checkin já foi realizado!");
        }
      }
      else{
        this.checkinEmitter.emit("ALERT");
      }
    }
  }

  prepareDate(date: Date | undefined): string {
    if(date){
      const formatedDate = new Date(date.toString()).toLocaleDateString("pt-BR");
      return formatedDate;
    }

    return "-";
  }
}
