import { PostService } from 'src/app/shared/services/post.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { AuthService } from '../app/shared/services/auth.service';
import { LoginPageComponent } from './shared/components/login-page/login-page.component'
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from '../app/shared/services/auth.guard';



const routes: Routes = [
  {
    path: 'admin',loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'', component: MainLayoutComponent, children:[
      {path:'', redirectTo:'/login', pathMatch:'full'},
      {path:'login', component: LoginPageComponent},
      {path:'register', component: RegisterPageComponent},
      {path:'home', component: HomePageComponent, canActivate:[AuthGuard]},
      {path:'**', redirectTo:'/home', pathMatch:'full'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, AuthService, CommentService, PostService]
})
export class AppRoutingModule { }
