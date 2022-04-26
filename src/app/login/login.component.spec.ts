import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have as title 'Login'`, () => {
    expect(comp.title).toEqual('Login');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Login');
  });

  it('should have a form with class login-form', waitForAsync(() => {
    fixture.detectChanges();
    // Arrange & Assert
    const el = fixture.debugElement.query(By.css('form.login-form'));
    expect(el).toBeTruthy();
  }));

  // it('should call the submitForm method when the login-form is submitted', waitForAsync(() => {
  //   fixture.whenStable().then(() => {
  //     const el = fixture.debugElement.query(By.css('.login-form'));
  //     const fnc = spyOn(comp, 'login');

  //     el.triggerEventHandler('ngSubmit', null);

  //     expect(fnc).toHaveBeenCalled();
  //   });
  // }));

  it(`form should be invalid`, waitForAsync(() => {
    fixture.whenStable().then(() => {
      comp.loginForm.controls['username'].setValue('');
      comp.loginForm.controls['password'].setValue('');
      expect(comp.loginForm.valid).toBeFalsy();
    });
  }));

  it(`form should be valid`, waitForAsync(() => {
    fixture.whenStable().then(() => {
      comp.loginForm.controls['username'].setValue('name@domain.com');
      comp.loginForm.controls['password'].setValue('changeme');

      expect(comp.loginForm.valid).toBeTruthy();
    });
  }));
});
