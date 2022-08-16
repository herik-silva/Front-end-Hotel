import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { ButtonComponent } from './button/button.component';
import { RoomViewComponent } from './room-view/room-view.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { ViewRoomCardComponent } from './view-room-card/view-room-card.component';
import { GuestViewComponent } from './guest-view/guest-view.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { GuestInfoBarComponent } from './guest-info-bar/guest-info-bar.component';
import { NewGuestComponent } from './new-guest/new-guest.component';
import { InfoGuestComponent } from './info-guest/info-guest.component';
import { NewAccommodationComponent } from './new-accommodation/new-accommodation.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EmplooyePageComponent } from './emplooye-page/emplooye-page.component';
import { ReserveViewComponent } from './reserve-view/reserve-view.component';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { ReserveInfoComponent } from './reserve-info/reserve-info.component';
import { ReserveInfoBarComponent } from './reserve-info-bar/reserve-info-bar.component';
import { NewReserveComponent } from './new-reserve/new-reserve.component';
import { MinimalRoomListComponent } from './minimal-room-list/minimal-room-list.component';
import { MinimalGuestListComponent } from './minimal-guest-list/minimal-guest-list.component';
import { AlertPopUpComponent } from './alert-pop-up/alert-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RoomCardComponent,
    MenuPrincipalComponent,
    ButtonComponent,
    RoomViewComponent,
    NewRoomComponent,
    ViewRoomCardComponent,
    GuestViewComponent,
    GuestListComponent,
    GuestInfoBarComponent,
    NewGuestComponent,
    InfoGuestComponent,
    NewAccommodationComponent,
    LoginPageComponent,
    EmplooyePageComponent,
    ReserveViewComponent,
    ReserveListComponent,
    ReserveInfoComponent,
    ReserveInfoBarComponent,
    NewReserveComponent,
    MinimalRoomListComponent,
    MinimalGuestListComponent,
    AlertPopUpComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "login", component: LoginPageComponent },
      { path: "", component: EmplooyePageComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
