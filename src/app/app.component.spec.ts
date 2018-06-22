import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { routes } from './app-routing.module';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('Router', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  it('can navigate to main (async)', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.get(Router)
      .navigate([''])
      .then(() => {
        expect(location.pathname).toEqual('/dashboard');
      })
      .catch(e => console.log(e));
  }));

  it('can navigate to dashboard (async)', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.get(Router)
      .navigate(['/dashboard'])
      .then(() => {
        expect(location.pathname).toEqual('/dashboard');
      })
      .catch(e => console.log(e));
  }));

  it('can navigate to heroes (async)', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.get(Router)
      .navigate(['/heroes'])
      .then(() => {
        expect(location.pathname).toEqual('/heroes');
      })
      .catch(e => console.log(e));
  }));
});

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Tour of Heroes'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tour of Heroes');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Tour of Heroes');
  }));
});
