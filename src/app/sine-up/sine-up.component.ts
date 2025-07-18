import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from './User';

@Component({
  selector: 'app-sine-up',
  templateUrl: './sine-up.component.html',
  styleUrls: ['./sine-up.component.css']
})
export class SineUpComponent implements OnInit {
  image:any;
  user = new User();
  constructor(private services: ApiService, private router: Router) { }
  ngOnInit(): void {

  }

  BackToLoginMothod() {
    this.router.navigate([""]);
  }
  SineUpMethod() {
    debugger
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('object', JSON.stringify(this.user));
    this.services.PostUser(formData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate([""]);
      }
    )
  }


  ImageUploadMethod(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

}
