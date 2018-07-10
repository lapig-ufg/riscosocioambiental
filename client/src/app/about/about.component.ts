import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(@Inject('Window') window: Window) {
  	(<any>window).page = 2
  }

  ngOnInit() {
  }

}
