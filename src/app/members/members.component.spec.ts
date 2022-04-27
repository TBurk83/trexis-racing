import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService, MockMembers } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersComponent } from './members.component';
import { LoginComponent } from '../login/login.component';

describe('MembersComponent', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let comp: MembersComponent;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }]),
      ],
      providers: [AppService],
    }).compileComponents();
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    comp = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  it('should return an Observable<MockMembers[]> if username is defined in appservice', () => {
    comp.username = 'Trevor';

    const fnc = spyOn(comp, 'getMembers');

    fnc();

    const expectedUrl = `http://localhost:8000/api/members`;

    service.getMembers().subscribe((res) => expect(res).toBe(MockMembers));
    expect(fnc).toHaveBeenCalled();
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(MockMembers);
  });

  it('should call the removeMember method and then the delete member api method', waitForAsync(() => {
    const memberId: number = 3;

    const memberToRemove: {} = MockMembers.filter((obj) => {
      return obj.id === memberId;
    });

    service.deleteMember(memberId).subscribe((res) => {
      expect(res).toBe(
        MockMembers.splice(
          MockMembers.findIndex((member) => member.id === memberId),
          1
        )
      );
    });

    httpMock.expectOne({
      method: 'DELETE', // find open Http request that is a get request.
    });

    expect(MockMembers).not.toContain(jasmine.objectContaining(memberToRemove));
  }));

  // it('should forward to login if onInit if no username is set', () => {
  //   const navigateSpy = spyOn(router, 'navigate');
  //   comp.username = '';

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //   });
  //   expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  // });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
