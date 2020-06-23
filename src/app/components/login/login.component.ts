import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  returnUrl:string;
  users;
  submitted = false;

  constructor(private fb:FormBuilder,private http:AuthServiceService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      uname:['',[Validators.required,Validators.minLength(4)]],
      pswd:['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]],
      remember:[false,Validators.requiredTrue]
    })
    this.returnUrl=this.route.snapshot.queryParams['blogs'] || "/";
  }

  get password() {
    return this.loginForm.get('pswd');
  }
  get username(){
    return this.loginForm.get('uname');
  }

  get remember(){
    return this.loginForm.get('remember'); 
  }


  logint(formdata:NgForm){
   
    return this.http.login(formdata).subscribe((res)=> { this.users.push(res)})
    
  }
  // Function to disable form
  disableForm() {
    this.loginForm.controls['uname'].disable(); // Disable username field
    this.loginForm.controls['pswd'].disable(); // Disable password field
    this.loginForm.controls['remember'].disable(); // Disable remember field
  }

  // Function to enable form
  enableForm() {
    this.loginForm.controls['uname'].enable(); // Enable username field
    this.loginForm.controls['pswd'].enable(); // Enable password field
    this.loginForm.controls['remember'].enable(); // Disable remember field
  }

  login(formData:NgForm) {

    this.submitted = true;
    this.disableForm();
    console.log(formData);
    if(!this.remember.value){
      this.remember.setErrors({"invalid":true});
    }
    if (this.loginForm.invalid) {
      return;
  } 
    console.log(formData);
    const user={
      'username':formData["uname"],
      'password':formData["pswd"]
  
    };
   
    this.http.loginForm(user).subscribe(response => {
      console.log(response);
      if(response.status == '200' && response.token){
        
        setTimeout(()=>{
          this.router.navigate(['blog'])
        }
      ,2000 ); }
      else{
        alert(response.message);
        this.submitted = false;
        this.enableForm();
        this.loginForm.reset();
       
      }
       
  });

  }}
  