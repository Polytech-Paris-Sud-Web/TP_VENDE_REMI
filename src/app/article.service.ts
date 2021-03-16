import { Injectable } from '@angular/core';
import { Article } from './models/article.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) { }
  
  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public getArticle(id: number):Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }

  public deleteArticle(id: number) : Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/articles/${id}`);
  }

  public createArticle(article: {title : string,content : string,author : string}) : Observable<Article> {
    return this.http.post<Article>(`http://localhost:3000/articles/`,article);
  }

}
