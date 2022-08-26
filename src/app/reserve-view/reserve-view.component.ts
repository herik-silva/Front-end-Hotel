import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import PileSection from 'src/Entity/PileSection';
import ReserveView from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-reserve-view',
  templateUrl: './reserve-view.component.html',
  styleUrls: ['./reserve-view.component.css']
})
@Injectable()
export class ReserveViewComponent implements OnInit {
  filter: FormControl<string>;
  selectedReserve?: ReserveView;
  selectedSection: SectionReserve;
  pileSection: PileSection<SectionReserve>;
  newReserve?: ReserveView;
  sectionList = {
    RESERVE_LIST: "RESERVE_LIST" as SectionReserve,
    NEW_RESERVE: "NEW_RESERVE" as SectionReserve,
    INFORMATION: "INFORMATION" as SectionReserve,
    REMOVE_RESERVE: "REMOVE_RESERVE" as SectionReserve,
    EDIT_RESERVE: "EDIT_RESERVE" as SectionReserve,
    ALERT: "ALERT" as SectionReserve,
    CHECKOUT: "CHECKOUT" as SectionReserve
  }

  constructor(private http: HttpClient) {
    this.filter = new FormControl();
    this.pileSection = new PileSection(this.sectionList.RESERVE_LIST);
    this.selectedSection = this.pileSection.nextSection();
  }

  ngOnInit(): void {
  }

  setReserve(reserve: ReserveView): void {
    this.selectedReserve = reserve;
  }

  setSection(sectionName: SectionReserve): void {
    this.selectedSection = sectionName;
    this.pileSection.insert(sectionName);
    console.log(this.selectedSection);
  }

  closeSection(section: SectionReserve): void {
    this.selectedSection = this.pileSection.nextSection();
  }

  setNewReserve(newReserve: ReserveView): void {
    this.newReserve = newReserve;
  }

  makeCheckin(reserve: ReserveView, http: HttpClient): void {
    if(reserve){
      const url = "api/reserve/checkin";
      const formData = new FormData();
      console.log("Preparando dados");
 
      const reserveData = [
        {key: "id", value: reserve.reserveId.toString()},
        {key: "status", value: "Checkin"},
        {key: "checkinAmount", value: (++reserve.checkinAmount).toString()},
        {key: "lastCheckin", value: new Date().toISOString().split("T")[0]}
      ]
    
      console.log("INserir dados no form");
      for(let data of reserveData){
        formData.append(data.key, data.value);
      }

      const obsRequest = http.put(url, formData);

      obsRequest.subscribe({
        next: data => {
        },
        complete: () => {
          console.log("completo");
        },
        error(err) {
          console.log(err)
        },
      });
    }
  }
}
