import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.maxLength(255),
        Validators.required
      ]),
      message: new FormControl(null, [
        Validators.maxLength(65535),
        Validators.required
      ])
    })
  }


  submit(){
    if(this.form.invalid){
      return
    }
    // const post:Post= {
    //   title: this.form.value.title,
    //   message: this.form.value.message,
    //   userId: string
    // }

  }
}
