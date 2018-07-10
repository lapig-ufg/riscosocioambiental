import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(@Inject('Window') window: Window) {
  	(<any>window).page = 0
  }

  ngOnInit() {
  }

}
