import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;
  @Output()
  createdArticle: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder,private articleService:ArticleService) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content : ['', Validators.required ],
      author : ['', Validators.required ],
    });
  }

  ngOnInit(): void {
  }

  createArticle(){
    const { title, content, author } = this.articleForm.value;
    const newArticle = {
      title,
      content,
      author
    }
    this.articleService.createArticle(newArticle).subscribe(()=>{
      this.createdArticle.emit();
      this.clearForm();
    });
  }

  clearForm(){
    this.articleForm.reset({
      title: 'Fake Title',
      content : '',
      author : '',
    });
  }

}
