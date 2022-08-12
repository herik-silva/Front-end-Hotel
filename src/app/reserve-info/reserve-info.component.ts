import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import ReserveView from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-reserve-info',
  templateUrl: './reserve-info.component.html',
  styleUrls: ['./reserve-info.component.css']
})
export class ReserveInfoComponent implements OnInit {
  @Input() iconPath: string;
  @Input() selectedReserve?: ReserveView

  @Output() closeEmitter: EventEmitter<SectionReserve>;

  constructor() {
    this.closeEmitter = new EventEmitter();
    this.iconPath = "";
  }

  ngOnInit(): void {
  }

  close(): void {
    this.closeEmitter.emit("RESERVE_LIST");
  }

  prepareDate(date: Date | undefined): string {
    console.log(date);
    if(date){
      return new Date(date.toString()).toLocaleDateString("pt-BR");
    }

    return "-";
  }

  prepareValue(value: any): any {
    if(value)
      return value;

    return "-";
  }

  prepareImage(imgName: string | undefined): string {
    if(imgName)
      return `http://localhost:3000/uploads/${imgName}`;

    return 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
  }
}
