import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Links, Meta, Post } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private token: string | null = localStorage.getItem('auth-token');

  constructor(private http: HttpClient) {}

  getPost(numberPage: number): Observable<{data:Post[], links: Links, meta: Meta}>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Content-Type', 'application/json');
    // let param = new HttpParams()
    // .set('per_page', '6');
    const httpOptions = {
      headers: header,
      // params: param
    };
    return this.http.get<{data:Post[], links: Links, meta: Meta}>(`https://guest-book.naveksoft.com/api/v1/posts?page=${numberPage}`, httpOptions)
  };

  addPost(post:Post): Observable<Post>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: header
    };
    return this.http.post<Post>('https://guest-book.naveksoft.com/api/v1/posts',post, httpOptions)
  };

  deletePost(postId: any): Observable<{response: boolean}>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: header
    };
    return this.http.delete<{response: boolean}>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}`, httpOptions)
  };
}
