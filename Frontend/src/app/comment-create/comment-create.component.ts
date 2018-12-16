import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CocktailService } from '../services/cocktail.service';
import { Comment } from '../models/comment.model';
import { formatDate } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  @Input()
  cocktail: Cocktail;

  comments: Comment[] = [];
  commented: boolean;

  comment: Comment;
  today = new Date();
  user: User;
  public loggedIn: boolean;

  commentForm = new FormGroup({
    commentContent: new FormControl('', Validators.required)
  });

  constructor(private commentService: CocktailService,
              private authService: UserService) {
    this.authService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.authService.getCurrentUser().then((user) => {
          this.user = user;
        });
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
      this.comment = new Comment(this.cocktail.id.toString(),
        formatDate(this.today, 'dd-MM-yyyy hh:mm:ss', 'en-US', ),
        this.commentForm.value.commentContent ,
        this.user.firstName + ' ' + this.user.lastName);
      this.comments.push(this.comment);
      this.commented = true;
      this.commentService.addComment(this.comment).subscribe(() => {});
  }

}
