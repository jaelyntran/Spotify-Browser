import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";

@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
      this.albumId = this.route.snapshot.paramMap.get('id');
      this.spotifyService.getAlbum(this.albumId).then((album:AlbumData) => {
          this.album = album;
      }).catch(error => {
          console.log("Failed to fetch album data: ", error);
      })
      this.spotifyService.getTracksForAlbum(this.albumId).then((tracks:TrackData[]) => {
          this.tracks = tracks;
      }).catch(error => {
          console.log("Failed to fetch album's tracks: ", error);
      })
  }
}
