import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { InitialComponent } from './initial/initial.component'
import { AboutComponent } from './about/about.component'
import { MapComponent } from './map/map.component'

const routes: Routes = [
	{ path: 'sicar', component: FormsComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'map', component: MapComponent },
	{ path: 'home', component: InitialComponent},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
