import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Button from 'src/Entity/Button';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  classList; 
  btnSelected: number;
  buttonList: Array<Button>;
  
  @Input() username: string;
  @Output() changeViewEmitter = new EventEmitter<number>();

  constructor() {
    this.btnSelected = 0;
    this.username = "";
    this.classList = {
      selected: "button selected",
      default: "button"
    }

    this.buttonList = [
      {
        imagePath: "assets/icons/quartos.png",
        text: "Quartos",
        class: this.classList.selected
      },
      {
        imagePath: "assets/icons/hospede.png",
        text: "Hospedes",
        class: this.classList.default
      },
      {
        imagePath: "assets/icons/reservas.png",
        text: "Reservas",
        class: this.classList.default
      }
    ];


  }

  ngOnInit(): void {
  }

  click(id: number) {
    if(this.btnSelected > -1){
      this.buttonList[this.btnSelected].class = this.classList.default;
    }

    this.buttonList[id].class = this.classList.selected;
    this.btnSelected = id;

    this.changeViewEmitter.emit(id);
  }

  getLoggedUsername(): string {
    return `Logado: ${this.username}`;
  }
}
