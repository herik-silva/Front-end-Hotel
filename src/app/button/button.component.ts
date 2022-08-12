import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  private classList; 
  @Input() imagePath: string;
  @Input() buttonName: string;
  @Input() selectedClass: string;
  public selected: boolean;


  constructor() {
    this.imagePath = "";
    this.buttonName = "";
    this.selected = false;

    this.classList = {
      selected: "button selected",
      default: "button"
    };

    this.selectedClass = this.classList.default;
  }

  ngOnInit(): void {}
}
