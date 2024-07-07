import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls : ['./post-list-component.css']
})


export class PostListComponent {
  // posts = [
  //   {title: 'First Post', content: ' lalalal 1 '},
  //   {title: 'Second Post', content: ' lalalal 2 '},
  //   {title: 'Third Post', content: ' lalalal 3 '},
  // ];

  @Input() posts: { title: string, content: string }[] = [];

}
