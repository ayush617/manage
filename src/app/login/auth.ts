import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";

@Injectable()
export class Auth implements CanActivate{

    constructor( private router: Router ) {}

    canActivate() {
        if(localStorage.getItem('isLogin')){
            return true;
        }
        localStorage.clear();
        this.router.navigate(["/login"])
        return false;
    }
}