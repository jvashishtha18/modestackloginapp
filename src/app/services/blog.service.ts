import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  options;
  domain = "http://localhost:8080/";

  constructor(
    private authService: AuthServiceService,
    private http: HttpClient
  ) { }

// Function to create headers, add token, to be used in HTTP requests
// createAuthenticationHeaders() {
//   this.authService.loadToken(); // Get token so it can be attached to headers
//   // Headers configuration options
//   this.options = new RequestOptions({
//     headers: new Headers({
//       'Content-Type': 'application/json', // Format set to JSON
//       'authorization': this.authService.authToken // Attach token
//     })
//   });
// }

// Function to create a new blog post
newBlog(blog) {
  // this.createAuthenticationHeaders(); // Create headers
  return this.http.post(this.domain + 'blogs/newBlog', blog, this.options).pipe(map(res => res));
}

// Function to get all blogs from the database
getAllBlogs() {
  // this.createAuthenticationHeaders(); // Create headers
  return this.http.get(this.domain + 'blogs/allBlogs', this.options).pipe(map(res => res));
}

// Function to get the blog using the id
getSingleBlog(id) {
  // this.createAuthenticationHeaders(); // Create headers
  return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options).pipe(map(res => res));
}

// Function to edit/update blog post
editBlog(blog) {
  // this.createAuthenticationHeaders(); // Create headers
  return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).pipe(map(res => res));
}

// Function to delete a blog
deleteBlog(id) {
  // this.createAuthenticationHeaders(); // Create headers
  return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).pipe(map(res => res));
}


}
