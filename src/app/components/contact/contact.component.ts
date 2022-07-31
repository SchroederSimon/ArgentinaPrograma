import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


contact: UntypedFormGroup;

constructor(private fb: UntypedFormBuilder,
) {
    this.contact = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })
}

  ngOnInit(): void {
  }

  sendEmail(e: Event) {
    emailjs.sendForm('service_pdcxozc', 'template_alieq3r', e.target as HTMLFormElement, '4s4g2DTt8sihTKlsX')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}