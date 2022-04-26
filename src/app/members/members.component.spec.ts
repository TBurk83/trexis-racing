import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService, MockMembers } from '../app.service';

import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let comp: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AppService],
    }).compileComponents();
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  it('should return an Observable<DataSample[]>', () => {
    expect(service).toBeTruthy();

    const expectedUrl = `http://localhost:8000/api/members`;

    service.getMembers().subscribe((res) => expect(res).toBe(MockMembers));

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(MockMembers);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
