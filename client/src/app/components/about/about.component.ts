import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import {ProfileData} from "../../data/profile-data";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
    name:string = null;
    profile_pic:string = "assets/unknown.jpg";
    profile_link:string = null;

    constructor(private spotifyService: SpotifyService) {}

    ngOnInit() { }

    loadUserInfo () {
        this.spotifyService.aboutMe().then((profile:ProfileData) => {
            this.name = profile.name;
            this.profile_pic = profile.imageURL;
            this.profile_link = profile.spotifyProfile;
        }).catch(error => {
            console.log("Failed to fetch profile data: ", error);
        })
    }
}
