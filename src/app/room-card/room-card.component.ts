import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})

/**
 * Objetivo da classe é controlar o componente RoomCard.
 * O Componente é responsável por apresentar as situações de
 * cada um dos quartos cadastrados.
 * A classe contém os seguintes atributos:
 * - cardTitle: {Quarto + número do quarto}
 * - guestName: Nome do Hospede
 * - reserveDate: {Data de Ínicio - Data do Fim}
 * - status: {Situação do quarto, ex: "Livre"}
 * @author Herik Aparecida
 */
export class RoomCardComponent implements OnInit {
  private classType;
  @Input() cardId: number;
  @Input() cardTitle: string;
  @Input() guestName: string;
  @Input() reserveDate: string;
  @Input() status: string;
  @Input() btnRemoveClass: string;

  @Output() cardIdInfo: EventEmitter<number>;
  @Output() cardIdDelete: EventEmitter<number>;
  @Output() reserveCard: EventEmitter<number>;

  selectedClass: string;

  constructor() {
    this.cardTitle = "";
    this.guestName = "";
    this.reserveDate = "";
    this.status = "";
    this.selectedClass = "hidden";
    this.cardId = 0;

    this.cardIdInfo = new EventEmitter();
    this.cardIdDelete = new EventEmitter();
    this.reserveCard = new EventEmitter();
    
    this.classType = {
      livre: "header-card livre",
      ocupado: "header-card ocupado",
      remover: "close",
      escondido: "hidden"
    }

    this.btnRemoveClass = this.classType.escondido;
  }

  ngOnInit(): void {
    switch(this.status){
      case "Livre":
        this.selectedClass = this.classType.livre;
        break;
      
      case "Ocupado":
        this.selectedClass = this.classType.ocupado;
        break;
    }
  }

  selectClass() {
    switch(this.status){
      case "Livre":
        this.selectedClass = this.classType.livre;
        break;
      
      case "Ocupado":
        this.selectedClass = this.classType.ocupado;
        break;
    }
  }

  getCardId() {
    this.cardIdInfo.emit(this.cardId);
  }

  removeCard() {
    if(confirm(`Deseja remover o ${this.cardTitle}?`)){
      this.cardIdDelete.emit(this.cardId);
    }
  }

  reserve() {
    if(this.status == "Livre"){
      this.status = "Ocupado"
    }
    else{
      this.status = "Livre";
    }

    this.selectClass();

    this.reserveCard.emit(this.cardId);
  }
}
