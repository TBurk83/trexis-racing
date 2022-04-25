import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MemberDetailsComponent } from './member-details.component';

describe('MemberDetailsComponent', () => {
  let comp: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    comp = fixture.componentInstance;
    comp.member = { id: -1, firstName: '', lastName: '', jobTitle: '', team: '', status: '' };
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
});
