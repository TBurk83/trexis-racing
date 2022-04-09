import { Component, OnInit, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {

  teams = [];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  } 

  ngOnChanges() { }

   // TODO: Add member to members
   onSubmit(){

   }

}
