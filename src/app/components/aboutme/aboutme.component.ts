import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  cats1="assets/imagenes/cats1.jpg";
  
  constructor() { }

  ngOnInit(): void {
  }

}
