import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  comment: Comment;

  commentForm = new FormGroup({
    commentContent: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
