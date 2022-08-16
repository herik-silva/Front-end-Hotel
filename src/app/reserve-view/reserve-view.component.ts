import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import PileSection from 'src/Entity/PileSection';
import ReserveView from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

@Component({
  selector: 'app-reserve-view',
  templateUrl: './reserve-view.component.html',
  styleUrls: ['./reserve-view.component.css']
})
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
    ALERT: "ALERT" as SectionReserve
  }

  constructor() {
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

  sayHello(): void {
    alert("Hello");
  }
}
