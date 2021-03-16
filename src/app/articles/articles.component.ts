import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles ?: Article[];
  constructor(private articleService:ArticleService) {
   }

  ngOnInit(): void {
    this.getArticles();
  }

  delete(article: Article){
    this.articleService.deleteArticle(article.id).subscribe(()=>{
      this.getArticles();
    });
  }

  getArticles(){
    this.articleService.getArticles().subscribe((articles: Article[])=>{
      this.articles = articles;
    });
  }
  
}
