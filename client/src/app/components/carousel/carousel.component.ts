import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    standalone: false
})
export class CarouselComponent implements OnInit {
	@Input() carouselId:string;
	@Input() resources:ResourceData[];

  constructor() { }

  ngOnInit() {
      console.log(this.resources);
  }

  get carouselIdForBinding():string {
    return '#' + this.carouselId;
  }
}
