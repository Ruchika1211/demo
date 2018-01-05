import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { AuthDataService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: []
})

export class AppComponent implements OnInit {
    constructor(public _auth: AuthService,public auth:AuthDataService,public router: Router){
        
    
    }
    ngOnInit() {
        // this.auth.currentMessage.subscribe(message => console.log("vbv",message));
      }
   
}
