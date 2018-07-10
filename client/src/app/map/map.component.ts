import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(@Inject('Window') window: Window) { 
  	(<any>window).page = 1
  }

  ngOnInit() {
  }

}
