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
    comp.member = { id: -1, firstName: '', lastName: '', jobTitle: '', team: '', status: '' };

    fixture.detectChanges();
    // Arrange & Assert
    const el = fixture.debugElement.query(By.css('form.member-form'));
    expect(el).toBeTruthy();
  }));

  it('should call the submitForm method when the member-form is submitted', waitForAsync(() => {
    comp.member = { id: -1, firstName: '', lastName: '', jobTitle: '', team: '', status: '' };

    fixture.detectChanges();
    // Arrange
    const el = fixture.debugElement.query(By.css('.member-form'));
    const fnc = spyOn(comp, 'onSubmit');

    // Act
    el.triggerEventHandler('ngSubmit', null);

    // Assert
    expect(fnc).toHaveBeenCalled();
  }));

  it(`should set submitted to true`, waitForAsync(() => {
    comp.onSubmit();
    expect(comp.memberForm.submitted).toBeTruthy();
  }));

  // it(`should call the onSubmit method`, waitForAsync(() => {
  //   spyOn(comp, 'onSubmit');
  //   HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
  //   HTMLElement.click();
  //   expect(comp.onSubmit).toHaveBeenCalled();
  // }));

  it(`form should be invalid`, waitForAsync(() => {
    comp.memberForm.controls['firstName'].setValue('');
    comp.memberForm.controls['lastName'].setValue('');
    comp.memberForm.controls['jobTitle'].setValue('');
    expect(comp.memberForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, waitForAsync(() => {
    comp.memberForm.controls['firstName'].setValue('Trevor');
    comp.memberForm.controls['lastName'].setValue('Burkholder');
    comp.memberForm.controls['jobTitle'].setValue('Speed Racer');
    expect(comp.memberForm.valid).toBeTruthy();
  }));
});
