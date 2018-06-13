import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message.service';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    TestBed.get(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  describe('HeroService Calls', () => {
    const mockHeroes: Hero[] = [
      { id: 51, name: 'Mr. Pastaga' },
      { id: 52, name: 'Oulah' }
    ];

    it('should return mockHeroes', () => {
      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(mockHeroes, 'should return expected heroes'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(mockHeroes);
    });
  });
});
