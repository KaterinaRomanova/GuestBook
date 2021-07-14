import { Post, Meta, Links } from 'src/app/shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  posts: Post[] = [];
  post!: Post ;
  meta!: Meta;
  links!: Links;
  numberPage: number = 1;


  constructor(
    private postService: PostService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {


    this.postService.getPost(this.numberPage)
    .subscribe((response)=>{
      console.log(response)
      this.posts = response.data
      this.meta = response.meta
      this.links = response.links
    })
  }

  delete(postId: any){
    this.postService.deletePost(postId)
      .subscribe(()=>{
        this.posts = this.posts.filter(p=>p.id !== postId);
      })
  }



}
