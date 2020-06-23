import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  value: any;
  users;
  response;
  constructor(private fb: FormBuilder, private router: Router, private auth:AuthServiceService) {
    this.signupForm = this.fb.group({

      name: ["", [Validators.required, Validators.maxLength(20)]],
      uname: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      pswd: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      email: ["", [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        suite: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
        geo: this.fb.group({
          lat: ['', [Validators.required]],
          lng: ['', [Validators.required]]
        })
      }),
      phone: ['', [Validators.required]],
      website: ["", [Validators.required]],
      company: this.fb.group({
        name: ['', [Validators.required]],
        catchPhrase: ['', [Validators.required]],
        bs: ['', [Validators.required]]

      })
    }
    );
  }

  ngOnInit(): void {
  }
  
  // validators srts
  get Name() {
    return this.signupForm.get('name');
  }
  get UserName() {
    return this.signupForm.get('uname');
  }
  get Password() {
    return this.signupForm.get('pswd');
  }
  get Email() {
    return this.signupForm.get('email')
  }
  get Street() {
    return this.signupForm.get('address').get('street');
  }
  get Lng() {
    return this.signupForm.get('address').get('geo').get('lng');
  }
  get Lat() {
    return this.signupForm.get('address').get('geo').get('lat')
  }
  get Zipcode() {
    return this.signupForm.get('address').get('zipcode')
  }
  get Phone() {
    return this.signupForm.get('phone');
  }
  get Suite() {
    return this.signupForm.get('address').get('suite');
  }
  get City() {
    return this.signupForm.get('address').get('city')
  }
  get Bs() {
    return this.signupForm.get('company').get('bs')
  }
  get CatchPhrase() {
    return this.signupForm.get('company').get('catchPhrase');
  }
  get Cname() {
    return this.signupForm.get('company').get('name');
  }
  get Website() {
    return this.signupForm.get('website')
  }

signup(formData: NgForm) {
    event.preventDefault()
    const errors = []

    console.log(formData);
    if (errors.length === 0) {
     
  


console.log("user"+formData);
     return this.auth.signup(formData).subscribe(
        (res) => {
          if (res.success) {
            console.log(res);
        };
            this.router.navigate(['login']) || '/'

        }
      );
    }
  }

  

}
