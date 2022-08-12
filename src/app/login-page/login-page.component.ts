import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import UserAuthenticated from 'src/Entity/UserAuthenticated';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output() userEmitter: EventEmitter<UserAuthenticated>

  errorMessage?: string;

  private showingMessage: boolean;

  constructor() {
    this.userEmitter = new EventEmitter();
    this.showingMessage = false;
  }

  saveUser(user: UserAuthenticated) {
    sessionStorage.setItem("user", JSON.stringify(user));
    window.open("/", "_self")
  }

  showErrorMessage(message: string) {
    if(!this.showingMessage){
      this.showingMessage = true;
      this.errorMessage = message;
      setTimeout(()=>{
        this.errorMessage = undefined;
        this.showingMessage = false;
      }, 5000);
    }
  }

  ngOnInit(): void {
  }

}
