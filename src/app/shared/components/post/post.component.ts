import { PostService } from './../../services/post.service';
import { Comment, Post } from 'src/app/shared/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent implements OnInit {
  isShow: boolean = false;
  comments: Comment[] = [];
  emailCurrentUser!: string | null;
  @Input() posts!: Post[];
  @Input() postInfo!: Post;
  @Output() filteredPosts = new EventEmitter<number>();
  authService: any;

  constructor(
    private commentService: CommentService,
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.emailCurrentUser = localStorage.getItem('user-email');
  }

  showComments(postId: any){
    this.isShow = !this.isShow;
    this.commentService.getComments(postId)
    .subscribe((response)=>{
      this.comments = response.data;
    })
  }

  delete(postId: any, commentId?: any){
    if(commentId){
      this.commentService.deleteComment(postId, commentId)
      .subscribe(()=>{
        this.comments = this.comments.filter(p=>p.id !== commentId);
        console.log('Комментарий удален')
      })
    }else{
      this.postService.deletePost(postId)
      .subscribe(()=>{
        this.posts = this.posts.filter(p=>p.id !== postId);
        console.log(this.posts)
        this.filteredPosts.emit(postId);
      })
    }
  }
}
