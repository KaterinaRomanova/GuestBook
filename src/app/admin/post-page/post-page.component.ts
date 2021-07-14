
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { CommentService } from 'src/app/shared/services/comment.service';



@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postId! : number;
  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id
    this.commentService.getComments(this.postId)
    .subscribe((response)=>{
      console.log(response)
      this.comments = response.data;
    })
  }

  delete(commentId: any){
    this.commentService.deleteComment(this.route.snapshot.params.id, commentId)
      .subscribe(()=>{
        this.comments = this.comments.filter(p=>p.id !== commentId);
      })
  }

  goBack(){
    this.location.back();
  }

}
