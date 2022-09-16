import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import ReserveView from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-reserve-info',
  templateUrl: './reserve-info.component.html',
  styleUrls: ['./reserve-info.component.css']
})
export class ReserveInfoComponent implements OnInit {
  @Input() iconPath: string;
  @Input() selectedReserve?: ReserveView;
  @Input() isCheckout: boolean;

  @Output() closeEmitter: EventEmitter<SectionReserve>;

  discount: FormControl<number>;
  valueToPay?: string;

  constructor() {
    this.closeEmitter = new EventEmitter();
    this.iconPath = "";
    this.isCheckout = false;
    this.discount = new FormControl();
    this.discount.setValue(0);
  }

  ngOnInit(): void {
    console.group("Observação");
    console.log(this.selectedReserve?.observation);
    console.groupEnd();
    this.valueToPay = this.selectedReserve?.diaryPrice.toFixed(2).replace(".",",");

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

  updateValueToPay(event?: KeyboardEvent): void {
    if(event){
      if(this.selectedReserve && event.key == "Enter"){
        console.log(this.selectedReserve);
        this.valueToPay = (this.selectedReserve.diaryPrice - this.discount.value).toFixed(2).replace(".",",");
      }
    }
    else{
      if(this.selectedReserve){
        console.log(this.selectedReserve);
        this.valueToPay = (this.selectedReserve.diaryPrice - this.discount.value).toFixed(2).replace(".",",");
      }
    }
  }
}
