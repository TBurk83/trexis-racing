import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { AppService, MockUsers } from '../app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

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

  it('should return an Observable<MockUsers[]>', waitForAsync(() => {
    expect(service).toBeTruthy();

    // const id: number = 1;

    const expectedUrl = `http://localhost:8000/api/users`;

    service.getUsers().subscribe((res) => expect(res).toBe(MockUsers));

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');

    req.flush(MockUsers);
  }));

  it('should submit Login Form', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const el = fixture.debugElement.query(By.css('form'));
      const fnc = spyOn(comp, 'login');

      el.triggerEventHandler('submit', null);

      expect(fnc).toBeDefined();
      expect(fnc).toHaveBeenCalledTimes(1);
    });
  }));

  it('should submit Login Form', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const el = fixture.debugElement.query(By.css('form'));
      const fnc = spyOn(comp, 'login');
      // const navigateSpy = spyOn(router, 'navigate');

      el.triggerEventHandler('submit', null);

      // expect(comp.loginForm.invalid).toBe(false);
      // expect(comp.loginForm).toHaveBeenCalled();

      expect(fnc).toBeDefined();
      expect(fnc).toHaveBeenCalledTimes(1);
      // expect(navigateSpy).toHaveBeenCalledWith(['/members']);
    });
  }));

  it('should call login method', waitForAsync(() => {
    const fnc = spyOn(comp, 'login');

    fnc();

    expect(fnc).toHaveBeenCalled();
  }));

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
