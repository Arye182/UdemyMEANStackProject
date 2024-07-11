import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls : ['./post-list-component.css']
})


export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: ' lalalal 1 '},
  //   {title: 'Second Post', content: ' lalalal 2 '},
  //   {title: 'Third Post', content: ' lalalal 3 '},
  // ];

  posts: Post[] = [];
  private postSub: Subscription | undefined;


  constructor(public postsService: PostService) {}


  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) =>{
      this.posts = posts;
    } );
  }


  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
  }

}
