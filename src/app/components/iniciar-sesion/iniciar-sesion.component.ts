import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  

  loginUsuario: FormGroup;

  constructor(private Router: Router,
              private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private firebaseError: FirebaseCodeErrorService) { 
      this.loginUsuario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.Router.navigate(['/portfolio']);
    }).catch((error) => {
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }
}


// import { Component, Injectable, NgZone, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from "../../services/auth.service";




// @Component({
//   selector: 'app-iniciar-sesion',
//   templateUrl: './iniciar-sesion.component.html',
//   styleUrls: ['./iniciar-sesion.component.css',
//   "./bootstrap.min.css"]
// })

// @Injectable({
//   providedIn: 'root'
// })


// export class IniciarSesionComponent implements OnInit {
  
//   loginUsuario: FormGroup;

//   constructor( public authService: AuthService) { 
//   }

//   ngOnInit() { }
  

// }

  // loading = false;
  // loginUsuario: FormGroup;

  // constructor(private Router: Router,
  //             private fb: FormBuilder,
  //             private afAuth: AngularFireAuth,
  //             private toastr: ToastrService,
  //             private firebaseError: FirebaseCodeErrorService) { 
  //     this.loginUsuario = this.fb.group({
  //       email: ['', [Validators.required, Validators.email]],
  //       password: ['', Validators.required],
  //     })
  //   }

  // ngOnInit(): void {
  // }

  // login() {
  //   const email = this.loginUsuario.value.email;
  //   const password = this.loginUsuario.value.password;

  //   this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
  //     console.log(user);
  //     this.Router.navigate(['/portfolio']);
  //   }).catch((error) => {
  //     this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
  //   })
  // }
 // }
