import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

    username = '';
    email = '';
    name = '';
    department = '';
    career = '';
    year = '';

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Once component loads, get user's data to display on profile
        this.authService.getProfile().subscribe(profile => {

            this.username = profile.user.username; // Set username
            this.email = profile.user.email; // Set e-mail
            this.name = profile.user.name;
            this.department = profile.user.department;
            this.career = profile.user.career;
            this.year = profile.user.yearOfGrad;
        });
    }

}
