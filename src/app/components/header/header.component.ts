import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {

  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;

  constructor(public afAuth: AngularFireAuth,
              private Router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value)=>{
      this.jumpTo(value)
    })
  }
  
  jumpTo(section: any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'})
  }

  logOut(){
    this.afAuth.signOut().then(() => this.Router.navigate(['/portfolio']))
  }

  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }


}
