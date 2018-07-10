import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';
import { AppRoutingModule } from './app-routing.module';
import { InitialComponent } from './initial/initial.component';
import { AboutComponent } from './about/about.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    InitialComponent,
    AboutComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
