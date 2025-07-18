import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  UserList: any = {};

  constructor(private services: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const obj = localStorage.getItem("UserData");
    const userObj = JSON.parse(obj!);
    const id = userObj.id;
    this.services.GetSingleUser(id).subscribe(response => {
      this.UserList = response;
    });
  }

  updateUser() {
    this.services.UpdateUser(this.UserList.id, this.UserList).subscribe(res => {
      alert("User updated successfully!");
      this.getUser(); // Refresh
    });
  }

  deleteUser() {
    if (confirm("Are you sure you want to delete your account?")) {
      this.services.DeleteUser(this.UserList.id).subscribe(res => {
        alert("User deleted successfully!");
        localStorage.clear();
        this.router.navigate(['/login']);
      });
    }
  }

  cancelEdit() {
    this.getUser(); // Re-fetch original data
  }
}
