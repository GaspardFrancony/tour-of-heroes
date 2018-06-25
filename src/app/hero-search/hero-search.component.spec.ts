import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HEROES } from '../mock-heroes';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(HeroSearchComponent);
        component = fixture.componentInstance;
        heroServiceSpy.searchHeroes.and.callFake((term) => {
          // Lookalike function
          if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
          } else {
            return of(HEROES.filter((hero) => {
              if (hero.name.includes(term)) {
                return hero;
              }
            }));
          }
        });
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search heroes with Ma, actually 3 results ', fakeAsync(() => {
    component.search('Ma');
    tick(300); // Need because of the debounceTime(300) in search
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
  }));

  it('should search Narco (without the o) ', fakeAsync(() => {
    component.search('Narc');
    tick(300); // Need because of the debounceTime(300) in search
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(1);
  }));

  it('should search empty term resulting in no heroes', fakeAsync(() => {
    component.search('');
    tick(300); // Need because of the debounceTime(300) in search
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(0);
  }));
});
