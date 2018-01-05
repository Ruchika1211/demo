import { Component } from '@angular/core';



@Component({
    selector: 'my-myOrder',
    templateUrl: './myOrder.component.html',
    providers: []
})
export class myOrderComponent {


    userLoggedIn(event){
        alert("hi");
        console.log("event occur");
       

    }
}
