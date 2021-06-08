import { AuthGuard } from './shared/services/auth.guard';
import { ShareModule } from './../shared/components/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CommentsPageComponent
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    RouterModule.forChild([
      {
        path:'', component: AdminLayoutComponent, children:[
          {path:'', redirectTo:'/admin/login', pathMatch:'full'},
          {path:'login', component:LoginPageComponent},
          {path: 'comments', component: CommentsPageComponent, canActivate:[AuthGuard]}
        ]
      }
    ])
  ],
  providers:[
    AuthService,
    AuthGuard
  ]
})
export class AdminModule { }
