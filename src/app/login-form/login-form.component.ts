import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import UserAuthenticated from 'src/Entity/UserAuthenticated';
import ValidateInputs from 'src/Entity/ValidateInputs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

@Injectable()
export class LoginFormComponent implements OnInit {
  userName: FormControl;
  password: FormControl;
  formName: string;
  
  @Output() errMessageEmitter: EventEmitter<string>;
  @Output() userEmitter: EventEmitter<UserAuthenticated>;

  constructor(private http: HttpClient) {
    this.userName = new FormControl();
    this.password = new FormControl();
    this.userEmitter = new EventEmitter();
    this.errMessageEmitter = new EventEmitter();
    this.formName = "login";
  }

  ngOnInit(): void {
    this.addEventListenner();
  }

  private addEventListenner(): void {
    document.addEventListener("keydown", (keyDown) => {
      if(keyDown.key == "Enter"){
        const element = keyDown.target as HTMLElement
        const targetIsInput = !element.outerHTML.includes("body") && element.outerHTML.includes("input");
        if(targetIsInput)
          this.sendPost();
      }
    })
  }

  emitUser(user: UserAuthenticated) {
    this.userEmitter.emit(user);
  }

  sendPost() {
    const inputsValidated = new ValidateInputs([
      {
        field: this.userName,
        validateWith: "LARGER",
        compareTo: 4
      },
      {
        field: this.password,
        validateWith: "LARGER",
        compareTo: 7
      }
    ]).validate();
    if(inputsValidated){
      const url = "/api/authenticate";
      const auth = btoa(`${this.userName.value}:${this.password.value}`)
      const obsRequest = this.http.post<UserAuthenticated>(url, undefined, {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: `Basic ${auth}`
        })
      });

      obsRequest.subscribe({
        next: data => {
          this.emitUser(data);
        },
        error: data => {
          this.errMessageEmitter.emit("Login ou senha inválidos!");
        }
      });
    }
    else{
      this.errMessageEmitter.emit("Preencha todos os campos!");
    }
  }
}
