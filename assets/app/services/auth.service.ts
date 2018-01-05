
import { Http, Response, Headers } from "@angular/http";
import { Injectable} from "@angular/core";

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { AppSettings } from './constant'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class AuthDataService {
    constructor(private http: Http){}

userData={};
private data = new BehaviorSubject<Object>({});
userDataLogin = this.data.asObservable();
userLogin(message:Object) {
    this.data.next(message)
  }
    signup(data){
        const body = JSON.stringify(data);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(AppSettings.API_ENDPOINT+'googleSignup', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
              
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    normalsignup(data){
        const body = JSON.stringify(data);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(AppSettings.API_ENDPOINT+'Signup', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
              
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(data){
        const body = JSON.stringify(data);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(AppSettings.API_ENDPOINT+'Signin', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                this.userData=data.user;
              //  @Output() userLoggedIn=new EventEmitter();
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    loggedInuserData()
    {

       return this.userData
    
    }
}