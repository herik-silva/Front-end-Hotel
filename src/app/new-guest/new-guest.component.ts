import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Guest from 'src/Entity/Guest';
import { SectionGuest } from 'src/Types/viewsType';

type Company = {id: number, name: string};
type Validate = {name: string, isOk: boolean};

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.css']
})
@Injectable()
export class NewGuestComponent implements OnInit {
  @Input() sectionTitle: string;
  @Input() editGuest: Guest | undefined;

  @Output() closeEventEmitter: EventEmitter<SectionGuest>;
  @Output() newGuestEventEmitter: EventEmitter<Guest>;
  @Output() updateGuestEventEmitter: EventEmitter<Guest>;

  image: FormControl<File>;
  name: FormControl<string>;
  CPF: FormControl<string>;
  contactPhone: FormControl<string>;
  companyId: FormControl<number>;
  city: FormControl<string>;

  companies: Array<Company>;
  
  sourceImage: string;
  message: string;

  constructor(private http: HttpClient) {
    this.editGuest = undefined;
    this.sectionTitle = "";
    this.closeEventEmitter = new EventEmitter();
    this.newGuestEventEmitter = new EventEmitter();
    this.updateGuestEventEmitter = new EventEmitter();
    this.image = new FormControl();
    this.name = new FormControl();
    this.CPF = new FormControl();
    this.contactPhone = new FormControl();
    this.companyId = new FormControl();
    this.city = new FormControl();
    this.sourceImage = "";
    this.message = "";
    this.companies = [
      {
        id: 0,
        name: "Empresa A"
      },
      {
        id: 1,
        name: "Empresa B"
      }
    ];
  }

  ngOnInit(): void {
    if(this.sectionTitle == "Editar Hospede" && this.editGuest){
      const photo = this.editGuest.getPhoto();
      const companyId = this.editGuest.getCompany();

      if(photo)
        this.sourceImage = photo;

      if(companyId)
        this.companyId.setValue(companyId);

      this.name.setValue(this.editGuest.getName());
      this.CPF.setValue(this.editGuest.getCpf());
      this.contactPhone.setValue(this.editGuest.getContactPhone()[0]);
      this.city.setValue(this.editGuest.getCity());
    }
  }

  validateInputs(): boolean {
    var failed = false;
    const validateList: Array<Validate> = [
      {
        name: "Nome",
        isOk: this.name.value.length > 0
      },
      {
        name: "CPF",
        isOk: this.CPF.value.length == 14 || this.CPF.value.length == 11
      },
      {
        name: "Tel. Contato",
        isOk: this.contactPhone.value.length >= 8 && this.contactPhone.value.length <= 16
      }
    ]

    for(const validate of validateList){
      if(!validate.isOk){
        this.message += `${validate.name}\n`
        failed = true;
      }
    }

    if(failed){
      alert("Os campos a seguir são obrigatórios: \n" + this.message);
    }
    
    return !failed;
  }

  openChooseFile(): void {
    const inputFile = document.getElementById("imgSelect");
    if(inputFile){
      inputFile.click();
    }
  }

  onChange(event: any): void {
    const file = event.target.files[0] as File;
    if(file){
      file.arrayBuffer().then(buffer => {
        const base64Content = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        this.sourceImage = `data:${file.type};base64,${base64Content}`;
      });
    }
  }

  close(): void {
    this.closeEventEmitter.emit("GUEST_LIST");
  }

  newGuest(): void {
    if(this.validateInputs()){
      const guest = new Guest(
        this.name.value, [this.contactPhone.value], 
        this.CPF.value, this.city.value, 
        this.sourceImage, this.companyId.value
      );
  
      this.newGuestEventEmitter.emit(guest);
    }
  }

  updateGuest(): void {
    if(this.validateInputs() && this.editGuest){
      this.editGuest.setName(this.name.value);
      this.editGuest.setCpf(this.CPF.value);
      this.editGuest.setCompany(this.companyId.value);
      this.editGuest.setCity(this.city.value);
      this.editGuest.setContactPhone(this.contactPhone.value);
      this.editGuest.setPhoto(this.sourceImage);

      this.updateGuestEventEmitter.emit(this.editGuest);
    }
  }

  confirm(): void {
    if(this.sectionTitle == "Novo Hospede"){
      this.newGuest();
    }
    else{
      this.updateGuest();
    }

    this.close();
  }

  sendPost(): void {
    const url = "api/guest";
    const formData = new FormData();
    const guestData = [
      { key: "name", value: this.name.value },
      { key: "cpf", value: this.CPF.value },
      { key: "photo", value: this.sourceImage },
      { key: "contactPhone", value: this.contactPhone.value },
      { key: "city", value: this.city.value },
      { key: "companyId", value: this.companyId.value.toString() },
    ];

    for(let data of guestData){
      formData.append(data.key, data.value);
    }

    const obsRequest = this.http.post(url, formData);

    obsRequest.subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
}