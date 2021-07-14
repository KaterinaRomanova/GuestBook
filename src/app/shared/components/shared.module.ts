import { CommentService } from 'src/app/shared/services/comment.service';
import { PostService } from 'src/app/shared/services/post.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth.guard';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

@NgModule({
  imports:[
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports:[
    CreatePostComponent,
    LoginPageComponent,
    UserComponent,
    CreateCommentComponent
  ],
  declarations:[
    CreatePostComponent,
    LoginPageComponent,
    UserComponent,
    CreateCommentComponent,
    InfiniteScrollComponent
  ],
  bootstrap:[
    AuthService,
    AuthGuard,
    PostService,
    CommentService
  ]
})

export class ShareModule{

}
