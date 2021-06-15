
import { AuthService } from '../admin/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/interfaces'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MustMatch } from '../my.validators';
import { password } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup ;
  message!:string;

  constructor(
    private auth: AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message="Введите данные"
      }
    })

      this.form = this.formBuilder.group({
        email:[null, [
          Validators.email,
          Validators.required
        ]],
        password: [null,[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ]],
        confirmPassword: [null,[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ]],
        name: [null,[
          Validators.required,
          Validators.maxLength(255)
        ]],
        file: [null,[
          Validators.maxLength(10000),
        ]]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      })
  }



  submit(){
    if(this.form.invalid){
      return
    }
    const user: User={
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      password_confirmation: this.form.value.confirmPassword,
      file: this.form.value.file
    }
    this.auth.register(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/home'])
    }, error => {
      console.error(error);
      this.message= error.error.message
    })
  }
}


