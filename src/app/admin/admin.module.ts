import { AuthGuard } from '../shared/services/auth.guard';
import { ShareModule } from './../shared/components/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';
import { CommentService } from '../shared/services/comment.service';
import { LoginPageComponent } from '../shared/components/login-page/login-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    PostPageComponent
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule.forChild([
      {
        path:'', component: AdminLayoutComponent, children:[
          {path:'', redirectTo:'/admin/login', pathMatch:'full'},
          {path:'posts/:id', component: PostPageComponent},
          {path:'login', component:LoginPageComponent},
          {path: 'home', component: DashboardPageComponent, canActivate:[AuthGuard]}
        ]
      }
    ])
  ],
  providers:[
    AuthService,
    AuthGuard,
    PostService,
    CommentService
  ]
})
export class AdminModule { }
