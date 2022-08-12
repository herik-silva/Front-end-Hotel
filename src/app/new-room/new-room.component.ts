import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Accommodation from 'src/Entity/Accommodation';
import { Section } from "src/Types/viewsType";
import RenameFile from 'src/Entity/RenameFile';
import { environment } from 'src/environments/environment';
import Room from 'src/Entity/Room';
import ValidateInputs from 'src/Entity/ValidateInputs';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})

@Injectable()
export class NewRoomComponent implements OnInit {
  @Input() iconPath: string;
  @Input() room: Room | undefined;
  @Input() accommodationList: Array<Accommodation>;
  
  @Output() closeEventEmitter: EventEmitter<Section>;
  @Output() newRoom: EventEmitter<Room>;
  @Output() editRoom: EventEmitter<Array<any>>;
  
  sectionName: string;
  number: FormControl<number>;
  image: File | null;
  accommodationId: FormControl<number>;
  imagePlaceHolder: string;
  sourceImage: string;

  alert: string;

  constructor(private http: HttpClient) {
    this.iconPath = "";
    this.sectionName = "";
    this.imagePlaceHolder = "Sem Foto"
    this.sourceImage = "";
    this.room = undefined;

    this.alert = "";

    this.number = new FormControl();
    this.image = null;
    this.accommodationId = new FormControl();
    this.closeEventEmitter = new EventEmitter();
    this.newRoom = new EventEmitter();
    this.editRoom = new EventEmitter();

    this.accommodationList = [];
  }

  private hasAccommodation(): boolean {
    return this.accommodationList.length > 0;
  }

  private prepareAccommodations(): void {
    if(!this.hasAccommodation()){
      this.accommodationList = [new Accommodation("Sem Acomodações", 0, -1)];
    }
  }

  ngOnInit(): void {
    this.prepareAccommodations();
    
    if(this.room){
      this.accommodationId.setValue(this.room?.accommodationId);
      this.sourceImage = this.room.imgBase64;
      this.number.setValue(this.room.number);
      this.sectionName = "Editar Quarto"
    }
    else{
      this.sectionName = "Novo Quarto";
      this.accommodationId.setValue(this.accommodationList[0].id ? this.accommodationList[0].id : 0);
      this.number.setValue(1);
    }
  }
  
  closeWindow() {
    this.closeEventEmitter.emit("ROOM_LIST");
  }

  getFormValues(): FormData {
    const formData = new FormData();
    if(this.image){
      const file = new File([this.image], RenameFile.renameFile(this.image));
      formData.append("image", file);
      formData.append("photo", file.name);
    }

    if(this.room){
      formData.append("id", this.room.id.toString())
    }

    formData.append("number", this.number.value.toString());
    formData.append("status", "Livre");
    formData.append("accommodation", this.accommodationId.value.toString());

    return formData;
  }

  updateRoom() {
    if(this.room){
      const lastNumber = this.room.number;
      this.room.number = this.number.value;
      this.room.accommodationId = this.accommodationId.value;
      this.room.imgBase64 = this.sourceImage;
      this.editRoom.emit([lastNumber, this.room]);
      this.closeWindow();
    }
  }

  registerRoom(id: number) {
    if(this.sectionName == "Novo Quarto"){
      const room = new Room(id, this.number.value, this.accommodationId.value, this.sourceImage, "Livre");
      this.newRoom.emit(room);
      this.closeWindow();
    }
  }

  getData() {
    const inputValidate = new ValidateInputs([
      {
        field: this.number,
        validateWith: "LARGER",
        compareTo: 0
      },
      {
        field: this.accommodationId,
        validateWith: "LARGER",
        compareTo: -2
      }
    ]);

    if(inputValidate.validate()){
      const roomExists = this.room != undefined;

      if(roomExists){
        this.sendPut();
      }
      else{
        this.sendPost();
      }

    }
    else{
      alert("Preencha todos os campos acima!");
    }
  }

  onChange(event: any) {
    this.image = event.target.files[0] as File;
    if(this.image){
      this.image.arrayBuffer().then(buffer => {
        
        var base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        this.sourceImage = `data:${this.image?.type};base64,${base64}`;
      });
    }
  }

  chooseFile() {
    const input = document.getElementById("sendImage");
    if(input){
      input.click();
    }
  }

  sendPost() {
    const formData = this.getFormValues();

    const request = this.http.post<{lastId: number}>("/api/room", formData,
      {headers: new HttpHeaders({
        Accept: 'application/json',
      })}
    );

    // Implementando uma abstração para padronizar.
    request.subscribe({
      next: data => {
        this.registerRoom(data.lastId);
        console.log(data);
      },
      error: error => {
        alert("Não foi possível cadastrar o Quarto!");
      }
    });
  }

  sendPut() {
    const formData = this.getFormValues();
    const request = this.http.put("/api/room", formData,
      {headers: new HttpHeaders({
        Accept: 'application/json',
      })}
    );

    request.subscribe({
      next: data => {
        this.updateRoom();
        console.log(data);
      }
    })
  }
}