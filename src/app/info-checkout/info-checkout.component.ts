import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ReserveView from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-info-checkout',
  templateUrl: './info-checkout.component.html',
  styleUrls: ['./info-checkout.component.css']
})
export class InfoCheckoutComponent implements OnInit {

  @Input() iconPath: string;
  @Input() selectedReserve?: ReserveView

  @Output() closeEmitter: EventEmitter<SectionReserve>;

  constructor() {
    this.closeEmitter = new EventEmitter();
    this.iconPath = "";
  }

  ngOnInit(): void {
    console.group("Observação");
    console.log(this.selectedReserve?.observation);
    console.groupEnd();

  }

  close(): void {
    this.closeEmitter.emit("RESERVE_LIST");
  }

  prepareDate(date: Date | undefined): string {
    if(date){
      const formatedDate = new Date(date.toString()).toLocaleDateString("pt-BR");
      console.log(formatedDate);
      return formatedDate;
    }

    return "-";
  }

  prepareValue(value: any): any {
    if(value){
      console.log("Com dado");
      return value;
    }

    console.log("Sem dado");
    return "-";
  }

  prepareImage(imgName: string | undefined): string {
    if(imgName)
      return `http://localhost:3000/uploads/${imgName}`;

    return 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
  }
}
