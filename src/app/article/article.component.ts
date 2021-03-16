import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {Article} from '../models/article.model';
import { ArticleService } from '../article.service';
import { filter, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input()
  article : Article;
  @Output()
  deletedArticle: EventEmitter<Article> = new EventEmitter();
  
  constructor(private articleService:ArticleService,private route: ActivatedRoute) {
   this.article = {id:0,title:'',content:'',author:''};
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      flatMap((params: ParamMap) => {
      let articleId = params.get('id');
      return this.articleService.getArticle(Number(articleId));
    })).subscribe((article:Article)=> {
      this.article = article;
    });
  }
  
  delete(){
    this.deletedArticle.emit(this.article);
  }

}
