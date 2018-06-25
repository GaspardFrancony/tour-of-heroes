import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HEROES } from '../mock-heroes';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const heroSearchSpy = jasmine.createSpyObj('HeroSearchComponent', ['search']);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent, HeroSearchStubComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: HeroSearchComponent, useValue: heroSearchSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        heroServiceSpy.getHeroes.and.returnValue(of(HEROES));
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 heroes before init', () => {
    expect(component.heroes.length).toEqual(0);
  });

  it('should return 4 heroes after init', async(() => {
    fixture.detectChanges();
    expect(component.heroes.length).toEqual(4);
  }));

  it('should show 4 <a> with heroes names', async(() => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.col-1-4')).length).toEqual(4);
  }));

});

@Component({ selector: 'app-hero-search', template: '' })
class HeroSearchStubComponent { }
