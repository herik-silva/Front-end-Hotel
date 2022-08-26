import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrls: ['./alert-pop-up.component.css']
})
@Injectable()
export class AlertPopUpComponent implements OnInit {
  title: string;
  @Input() confirmAlert: boolean;
  @Input() message?: string;
  @Input() btnText: string;
  @Input() callback?: Function;
  @Input() data?: any;

  @Output() closeEmitter: EventEmitter<SectionReserve>;
  @Output() confirmEmitter: EventEmitter<SectionReserve>;

  constructor(private http: HttpClient) {
    this.title = "Alerta";
    this.btnText = "Confirmar";
    this.confirmAlert = false;

    this.closeEmitter = new EventEmitter();
    this.confirmEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    this.checkMessage(this.message);
  }

  checkMessage(input: any) {
    console.log(input);
    if(!input)
      throw "message is required";
  }

  closeWindow(): void {
    this.closeEmitter.emit("RESERVE_LIST");
  }

  confirm(): void {
    if(this.callback)
      this.callback(this.data, this.http);
      this.closeWindow();

  }
}
