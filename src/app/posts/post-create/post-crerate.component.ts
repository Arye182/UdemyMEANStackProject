import { Component, EventEmitter, OnInit} from "@angular/core";
import { Post } from '../post.model';
import { FormControl, FormGroup , Validators} from "@angular/forms";
import { PostService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
  form: FormGroup | undefined;
  imagePreview: string | undefined;
  private mode = 'create';
  private postId : string | null = null;
  post : Post | undefined;
  isLoading = false;

  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl (null, {validators: [Validators.required], asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
            this.mode = 'edit';
            this.postId = paramMap.get('postId');

            this.isLoading = true;
            this.postsService.getPost(this.postId).subscribe(postData => {
              this.post = {id: postData._id, title: postData.title, content: postData.content};

              this.isLoading = false;

            this.form?.setValue({title: this.post.title, content: this.post.content })

            })
        } else {
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onAddPost() {
    if (this.form?.invalid) {
      return;
    }
    this.isLoading=true;
    if (this.mode === 'create' ) {
      this.postsService.addPost(this.form?.value.title,  this.form?.value.content);

    } else {
      this.postsService.updatePost(this.postId!, this.form?.value.title, this.form?.value.content)
    }

    this.form?.reset();
  }

  onImagePicked(event: Event){
  // Safely access the selected file
  const file = (event.target as HTMLInputElement).files?.[0];

  // Check if a file was selected
  if (!file) {
    console.warn("No file selected.");
    return; // Exit the function if no file is selected
  }

  // Update the form with the selected file
  this.form?.patchValue({ image: file });
  this.form?.get('image')?.updateValueAndValidity();

  // Create a FileReader to read the file and generate a preview
  const reader = new FileReader();
  reader.onload = () => {
    // Ensure the result is a string and update the image preview
    this.imagePreview = reader.result as string;
  };

  // Read the file as a data URL for previewing
  reader.readAsDataURL(file);



  }
}
