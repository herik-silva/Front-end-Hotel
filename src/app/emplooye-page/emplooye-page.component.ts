import { Component, OnInit } from '@angular/core';
import UserAuthenticated from 'src/Entity/UserAuthenticated';

@Component({
  selector: 'app-emplooye-page',
  templateUrl: './emplooye-page.component.html',
  styleUrls: ['./emplooye-page.component.css']
})
export class EmplooyePageComponent implements OnInit {
  viewList: Array<string>;
  selectedView: string;
  loggedUser?: UserAuthenticated;

  constructor() {
    this.viewList = [
      "quartos",
      "hospedes",
      "reservas",
      "recados"
    ];

    this.selectedView = "reservas";
  }

  changeView(id: number) {
    this.selectedView = this.viewList[id];
  }

  ngOnInit(): void {
    this.checkLoggedUser();
  }

  checkLoggedUser(): void {
    const userStringfied = sessionStorage.getItem("user");
    userStringfied ? this.getLoggedUser(userStringfied) : this.backToLogin();
  }

  getLoggedUser(userObjString: string): void {
    this.loggedUser = JSON.parse(userObjString);
    console.log(this.loggedUser);
  }

  backToLogin(): void {
    window.open("/login", "_self");
  }

  getUserName(): string {
    return this.loggedUser ? this.loggedUser.name : "";
  }

  getAcessLevel(): number {
    return this.loggedUser ? this.loggedUser.acessLevel : 0;
  }
}
