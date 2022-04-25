import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingUserComponent } from './loading-user.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('LoadingUserComponent', () => {
  let component: LoadingUserComponent;
  let fixture: ComponentFixture<LoadingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingUserComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
