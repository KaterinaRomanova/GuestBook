import { Post } from 'src/app/shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts: Post[] = [];
  numberPage: number = 1
  @Input() filteredPosts!: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPost(this.numberPage)
    .subscribe(response=>{
      this.posts= response.data;
    })
  }

  filterPost(postId: number) {
    this.posts = this.posts.filter(p=>p.id !== postId);
  }


}


