import { LoginPageComponent } from './admin/login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule} from './admin/admin.module'
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './admin/shared/services/auth.guard';

const routes: Routes = [
  {
    path:'admin', loadChildren:'./admin/admin.module#AdminModule'
  },
  {
    path:'', component: MainLayoutComponent, children:[
      {path:'', redirectTo:'/login', pathMatch:'full'},
      {path:'home', component: HomePageComponent},
      {path:'login', component: LoginPageComponent},
      {path:'register', component: RegisterPageComponent},
      ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
