import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  @ViewChild('memberForm') memberForm: NgForm;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public teams: [] = [];
  public member!: Member;
  private id: number = -1;
  public title = 'Add Member to a Racing Team';

  ngOnInit(): void {
    this.getTeams();

    console.log(this.router.url);

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.router.url === '/add-member') {
      this.member = {} as Member;
    } else {
      this.getMember(this.id);
    }
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit() {
    if (this.router.url === '/add-member') {
      this.createMember(this.member);
    } else {
      this.updateMember(this.id, this.member);
    }
  }

  getMember(id: number) {
    this.appService.getMember(id).subscribe((member: any) => (this.member = member));
  }

  getTeams() {
    this.appService.getTeams().subscribe((teams: any) => (this.teams = teams));
  }

  updateMember(id: number, member: Member) {
    this.appService.updateMember(id, member).subscribe((data: any) => {
      this.router.navigate(['/members']);
    });
  }

  createMember(member: Member) {
    this.appService.createMember(member).subscribe((data: any) => {
      this.router.navigate(['/members']);
    });
  }
}
