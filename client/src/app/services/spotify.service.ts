import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var uri:string = `${this.expressBaseUrl}${endpoint}`;

    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
      console.log('Response data from /me:', data);
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    const encodedResource = encodeURIComponent(resource);
    return this.sendRequestToExpress(`/search/${category}/${encodedResource}`).then((data) => {
      console.log('Received data:', data);

      const categoryKey = category === 'artist' ? 'artists' :
                                                category === 'album' ? 'albums' :
                                                category === 'track' ? 'tracks' : null;

      const items = data[categoryKey].items;
      console.log('Items:', items);

      return items.map((item: any) => {
        if(category === 'artist') return new ArtistData(item);
        if(category === 'album') return new AlbumData(item);
        if(category === 'track') return new TrackData(item);
        return null;
      }).filter(Boolean);
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    const encodedArtistID = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${encodedArtistID}`).then((data) => {
      return new ArtistData(data);
    })
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    const encodedArtistID = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-top-tracks/${encodedArtistID}`).then((data) => {
      return data.tracks.map((track: any) => new TrackData(track));
    })
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    const encodedArtistID = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-albums/${encodedArtistID}`).then((data) => {
      return data.items.map((album: any) => new AlbumData(album));
    })
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    const encodedAlbumID = encodeURIComponent(albumId);
    return this.sendRequestToExpress(`/album/${encodedAlbumID}`).then((data) => {
      return new AlbumData(data);
    })
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    const encodedAlbumID = encodeURIComponent(albumId);
    return this.sendRequestToExpress(`/album-tracks/${encodedAlbumID}`).then((data) => {
      return data.items.map((track: any) => new TrackData(track));
    })
  }

  getTrack(trackId:string):Promise<TrackData> {
    const encodedTrackID = encodeURIComponent(trackId);
    return this.sendRequestToExpress(`/track/${encodedTrackID}`).then((data) => {
      return new TrackData(data);
    })
  }
}