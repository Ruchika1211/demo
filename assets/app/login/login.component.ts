import { AuthDataService } from './../services/auth.service';
import { Component,Output, EventEmitter } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Router } from "@angular/router";


@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    providers: []
})
export class loginComponent {
 sub:any;
 user:any;
 signup: boolean = false;
 signin: boolean = true;
 signupError:boolean=false;
 nosignupError:boolean=false;
 signinError:boolean=false;
 nosigninError:boolean=false;
 isLoggedin:boolean=false;
    constructor(public _auth: AuthService,public auth:AuthDataService,public router: Router){
    

     }
@Output() userLoggedIn: EventEmitter <String> = new EventEmitter();

  signUpWithGoogle(){
   
    this.sub = this._auth.login("google").subscribe(
      (data) => {
                  console.log(data);
                  this.auth.signup(data)
                  .subscribe(
                      (data)=>
                      {
                        console.log(data);
                        console.log('data');
                        this._auth.logout().subscribe(
                          (data)=>{
                            console.log("logout success");
                          } 
                        )
                        if(data.message=="User already exist")
                        {
                          this.signupError=true;
                        }
                        else{
                          this.signup=false;
                          this.signin=true;
                          this.nosignupError=true;
                        
                          this.userLoggedIn.emit("data");
                        }
                      } ,
                      (error)=>
                      {
                        console.log(error)
                      } 
                  );
                  //user data
                  //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google)
                }
    )
  }

  signInWithGoogle(){
    
     this.sub = this._auth.login("google").subscribe(
       (data) => {
                   console.log(data);
                   this.auth.signin(data)
                   .subscribe(
                       (datat)=>
                       {
                         console.log(datat);
                         console.log('data');
                         this._auth.logout().subscribe(
                           (data)=>{
                             console.log("logout success");
                           } 
                         )
                         if(datat.message=="User not found"||datat.message=="Invalid password")
                         {
                           this.signinError=true;
                         }
                         else{
                           this.signup=false;
                           this.signin=true;
                           this.nosigninError=true;
                           this.auth.userLogin(data);
                           this.router.navigate(['']);
                         }
                       },
                       (error)=>
                       {
                         console.log(error)
                       } 
                   );
                 }
     )
   }

   submitForm(data){
    this.auth.normalsignup(data)
    .subscribe(
      (data)=>
      {
        console.log(data);
        console.log('data');
        if(data.message=="User already exist")
        {
          this.signupError=true;
        }
        else{
          this.signup=false;
          this.signin=true;
          this.nosignupError=true;
        }
        
      } ,
      (error)=>
      {
        console.log(error);
      } 
    );
   }

   submitSignInForm(data){
    this.auth.signin(data)
    .subscribe(
      (data)=>
      {
        console.log(data);
        console.log('data');
        if(data.message=="User not found"||data.message=="Invalid password")
        {
          this.signinError=true;
        }
        else{
          this.signup=false;
          this.signin=true;
          this.nosigninError=true;
          console.log("i m in event gfjgtfyujgu");

          this.auth.userLogin(data);
          this.router.navigate(['']);
          //this.userLoggedIn.emit(data);
        }
        
      } ,
      (error)=>
      {
        console.log(error);
      } 
    );
   }
 

  
  

    signUp(){
        this.signup=true;
        this.signin=false;
    }

    signIn(){
        this.signup=false;
        this.signin=true;
    }
}
