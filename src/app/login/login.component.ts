import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AuthserviceService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
submitted=false;
loginForm:FormGroup
loading=false
  constructor(
    private authservice:AuthserviceService,
    private formbuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.loginForm=this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }


  onSubmit(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return true;
    }

    this.authservice.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
          let errorMessage = error.detail ?
            error.detail :
            'Unable to process the operation. Please contact the administrator.';
        });
  }

}
