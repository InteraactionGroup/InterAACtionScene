import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoadingUserComponent } from './loading-user.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('LoadingUserComponent', () => {
  let component: LoadingUserComponent;
  let fixture: ComponentFixture<LoadingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingUserComponent],
      imports: [RouterTestingModule.withRoutes(
        [{path: 'fr/dashboard', component: LoadingUserComponent},
        {path: 'en/dashboard', component: LoadingUserComponent}]),
         TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick(110);
    expect(component).toBeTruthy();
  }));

  // check if it redirects to language specific dashboard
  it('should redirect to fr dashboard', fakeAsync(() => {
    spyOn(component.routes.snapshot.paramMap, 'get').and.returnValue('fr');
    // @ts-ignore
    spyOn(component.route, 'navigate');
    fixture.detectChanges();
    tick(110);
    // @ts-ignore
    expect(component.route.navigate).toHaveBeenCalledWith(['fr/dashboard']);
  }));
});
