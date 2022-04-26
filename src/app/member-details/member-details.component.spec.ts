import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberDetailsComponent } from './member-details.component';
import { AppService, MockMember, MockTeams } from '../app.service';

describe('MemberDetailsComponent', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let comp: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    comp = fixture.componentInstance;
    comp.member = { id: -1, firstName: '', lastName: '', jobTitle: '', team: '', status: '' };
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the comp', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have as title 'Add Member to a Racing Team'`, () => {
    expect(comp.title).toEqual('Add Member to a Racing Team');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.lead').textContent).toContain('Add Member to a Racing Team');
  });

  it('should have a form with class member-form', waitForAsync(() => {
    fixture.detectChanges();
    // Arrange & Assert
    const el = fixture.debugElement.query(By.css('form.member-form'));
    expect(el).toBeTruthy();
  }));

  it('should call the submitForm method when the member-form is submitted', waitForAsync(() => {
    const el = fixture.debugElement.query(By.css('.member-form'));
    const fnc = spyOn(comp, 'onSubmit');

    el.triggerEventHandler('ngSubmit', null);

    expect(fnc).toHaveBeenCalled();
  }));

  it(`form should be invalid`, waitForAsync(() => {
    fixture.whenStable().then(() => {
      comp.memberForm.controls['firstName'].setValue('');
      comp.memberForm.controls['lastName'].setValue('');
      comp.memberForm.controls['jobTitle'].setValue('');
      comp.memberForm.controls['team'].setValue('');
      comp.memberForm.controls['status'].setValue('');
      expect(comp.memberForm.valid).toBeFalsy();
    });
  }));

  it(`form should be valid`, waitForAsync(() => {
    fixture.whenStable().then(() => {
      comp.memberForm.controls['firstName'].setValue('Trevor');
      comp.memberForm.controls['lastName'].setValue('Burkholder');
      comp.memberForm.controls['jobTitle'].setValue('Speed Racer');
      comp.memberForm.controls['team'].setValue('Team Speed Racer');
      comp.memberForm.controls['status'].setValue('Active');

      expect(comp.memberForm.valid).toBeTruthy();
    });
  }));

  it('should return an Observable<MockMember{}>', waitForAsync(() => {
    expect(service).toBeTruthy();

    const id: number = 3;

    const expectedUrl = `http://localhost:8000/api/members/${id}`;

    service.getMember(id).subscribe((res) => expect(res).toBe(MockMember));

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');

    req.flush(MockMember);
  }));

  it('should return an Observable<MockTeams[]>', waitForAsync(() => {
    expect(service).toBeTruthy();

    service.getTeams().subscribe((res) => expect(res).toBe(MockTeams));
  }));
});
