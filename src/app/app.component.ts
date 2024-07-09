import { Component } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];
  title = 'my-first-full-stack-project';

  onPostAdded(post: any) {
    this.storedPosts.push(post);  }
}
