import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  username: string = '';
  password: string = '';
  title: string = 'Login';

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {}

  login() {
    this.appService.getUsers().subscribe(
      (res: any) => {
        console.log(res);
        const user = res.find((a: any) => {
          return a.username === this.username && a.password === this.password;
        });
        if (user) {
          alert('Login Succesful');
          this.appService.setUsername(user.username);
          this.router.navigate(['/members']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
