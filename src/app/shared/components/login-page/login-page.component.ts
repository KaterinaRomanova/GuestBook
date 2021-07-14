import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  form!: FormGroup ;
  message!:string;

  constructor(
    private auth: AuthService,
    private router:Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message="Введите данные"
      }else{
        this.message =''
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const user: User={
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe((response)=>{
      console.log(response)
      this.form.reset()
      if(this.router.url.includes('/admin/login') && response.user.is_admin){
        this.router.navigate(['/admin','home']);
      }else if(this.router.url ==='/login' && !response.user.is_admin){
        this.router.navigate(['home']);
      }else{
        this.message ='Данного пользователя не существует'
      }

    }, error => {
      console.error(error);
      this.message= error.error.message
    })
  }

}
