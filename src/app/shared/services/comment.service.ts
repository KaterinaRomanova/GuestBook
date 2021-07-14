import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private token: string | null = localStorage.getItem('auth-token');

  constructor( private http: HttpClient ){};

  getComments(postId: number): Observable<{data:Comment[]}>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: header
    };
    return this.http.get<{data:Comment[]}>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers`, httpOptions)
  };

  addComment(postId: number, comment: Comment): Observable<Comment>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: header
    };
    return this.http.post<Comment>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers`,comment, httpOptions)
  };

  deleteComment(postId: any, answerId: any): Observable<{response: boolean}>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: header
    };
    return this.http.delete<{response: boolean}>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers/${answerId}`, httpOptions)
  };
}
