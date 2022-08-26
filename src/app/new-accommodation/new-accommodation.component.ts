import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Accommodation from 'src/Entity/Accommodation';
import ValidateInputs from 'src/Entity/ValidateInputs';
import { Section } from 'src/Types/viewsType';

@Component({
  selector: 'app-new-accommodation',
  templateUrl: './new-accommodation.component.html',
  styleUrls: ['./new-accommodation.component.css']
})

@Injectable()
export class NewAccommodationComponent implements OnInit {
  @Input() sectionTitle: string;
  @Input() editAccommodation: Accommodation | undefined;

  @Output() closeEventEmitter: EventEmitter<Section>;
  @Output() newAccommodationEmitter: EventEmitter<Accommodation>;
  @Output() editedAccommodationEmitter: EventEmitter<Accommodation>;

  description: FormControl<string>;
  diaryPrice: FormControl<number>;

  constructor(private http: HttpClient) {
    this.sectionTitle = "Nova Acomodação";
    this.editAccommodation = undefined;

    this.closeEventEmitter = new EventEmitter();
    this.newAccommodationEmitter = new EventEmitter();
    this.editedAccommodationEmitter = new EventEmitter();

    this.description = new FormControl();
    this.diaryPrice = new FormControl();
  }

  ngOnInit(): void {
  }

  close(): void {
    this.closeEventEmitter.emit("ROOM_LIST");
  }

  sendAccommodation() {
    const formData = new FormData();
    formData.append("description", this.description.value);
    formData.append("dailyPrice", this.diaryPrice.value.toString());
    const url = "/api/accommodation";

    const observableRequest = this.http.post<any>(url, formData,
      {
        headers: new HttpHeaders(
          {
            Accept: 'application/json',
          }
        )
      });

    observableRequest.subscribe({
      next: data => {
        const id = data.lastId as number;
        this.registerAccommodation(id);
      }
    })
  }


  private registerAccommodation(id: number): Accommodation {
    const accommodation = new Accommodation(this.description.value, this.diaryPrice.value, id);
    this.newAccommodationEmitter.emit(accommodation);
    this.close();

    return accommodation;
  }

  confirm(): void {
    const inputsToValidate = new ValidateInputs([
      {
        field: this.description,
        validateWith: "LARGER",
        compareTo: 4
      },
      {
        field: this.diaryPrice,
        validateWith: "LARGER",
        compareTo: 0
      }
    ]);

    if(inputsToValidate.validate()){
      if(this.sectionTitle == "Nova Acomodação"){
        this.sendAccommodation();
      }
      else if(this.editAccommodation){
        this.editAccommodation.description = this.description.value;
        this.editAccommodation.dailyPrice = this.diaryPrice.value;
      }
    }
    else{
      alert("Preencha todos os campos corretamente!");
    }
  }
}