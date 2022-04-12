import { Component, OnInit, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute) { 
  }

  private mode: string = 'add';
  private id: number = -1;
  public teams: [] = [];
  public member!: Member;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })

    if (this.id >= 0) {
      this.mode = 'update';
      this.getMember(this.id);
    }

    this.getTeams();
   

    console.log(this.id)
  } 

  ngOnChanges() { }

   // TODO: Add member to members
   onSubmit(){
     if (this.mode === 'update') {
      
     } else {
       
    }
   }
  
  getMember(id: number) {
    this.appService.getMember(id).subscribe((member: any) => (this.member = member));
  }

   updateMember(id: number, member: any) {
     this.appService.updateMember(id, member).subscribe((data: any) => {console.log(data) });
   }
  
   createMember(id: number) {
    this.appService.createMember(id).subscribe((member: any) => (this.member = member));
  }

  getTeams() {
    this.appService.getTeams().subscribe((teams: any) => (this.teams = teams));
  }
}
