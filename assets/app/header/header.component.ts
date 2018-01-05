import { Component, EventEmitter,Output, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthDataService } from '../services/auth.service';


@Component({
    selector: 'my-navbar',
    templateUrl: './header.component.html',
    providers: []
})
export class headerComponent  implements OnInit {
    isLoggedin:boolean=false;
    loggedIn:any;
    userData:any;
    ngOnInit() {
      
        this.auth.userDataLogin.subscribe((userd)=>{
            console.log("login",userd);
            this.loggedIn=userd;
            console.log(this.loggedIn);
            console.log(this.loggedIn.length);
            console.log('this.loggedIn');
            var objectKey=Object.keys(userd);
            if(objectKey.length>0)
            {
               this.isLoggedin=true;
               this.userData=this.loggedIn.user;
               
            }
        });
      }

    
    constructor(public router: Router,public auth:AuthDataService){
  
        this.loggedIn=auth.loggedInuserData();
        console.log(this.loggedIn);
        console.log(this.loggedIn.length);
        console.log('this.loggedIn');
        if(this.loggedIn.length > 0)
        {
           this.isLoggedin=true;
           this.userData=this.loggedIn;
           
        }

    }

    logout(){
        this.isLoggedin=false;
        this.router.navigate(['/login']);
    }

   
}

