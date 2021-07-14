import { Post } from './../../interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor( public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
  }

}
