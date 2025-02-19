import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';
import {ArtistData} from "../../data/artist-data";
import {TrackListComponent} from "../track-list/track-list.component";
import {AlbumData} from "../../data/album-data";

@Component({
    selector: 'app-carousel-card',
    templateUrl: './carousel-card.component.html',
    styleUrls: ['./carousel-card.component.css'],
    standalone: false
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;

  constructor() { }

  ngOnInit() { }

  get resourceLink() : string {
      if (this.resource instanceof ArtistData) {
          return `/artist/${this.resource.id}`;
      } else if (this.resource instanceof AlbumData) {
          return `/album/${this.resource.id}`;
      } else {
          return '';
      }
  }
}
