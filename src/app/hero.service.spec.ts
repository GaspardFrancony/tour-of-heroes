import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

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

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  describe('HeroService Success Calls', () => {
    const mockHeroes: Hero[] = [
      { id: 51, name: 'Mr. Pastaga' },
      { id: 52, name: 'Oulah' }
    ];

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      TestBed.get(HttpTestingController).verify();
    });

    it('#addHero : should create newHero', () => {
      const newHero = { id: 53, name: 'ToujoursPlus' };
      heroService.addHero(newHero).subscribe(
        hero => expect(hero).toEqual(newHero, 'should return newHero')
      );

      // HeroService should have made one request POST to heroesUrl
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock hero
      req.flush(newHero);
    });

    it('#getHeroes : should return mockHeroes', () => {
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

    it('#getHero : should return a single hero', () => {
      const heroId = 51;
      const heroToFind = mockHeroes.find(
        hero => hero.id === heroId
      );

      heroService.getHero(heroId).subscribe(
        hero => expect(hero).toEqual(heroToFind, 'should return heroToFind')
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl + '/' + heroId);
      expect(req.request.method).toEqual('GET');

      req.flush(heroToFind, { status: 200, statusText: 'OK' });
    });

    it('#updateHero : should update one hero', () => {
      const heroIdToChange = 51;
      const heroChanged = { id: 51, name: 'Mr. Pastis' };

      heroService.updateHero(heroChanged).subscribe(
        hero => expect(hero).toEqual(heroChanged, 'should return hero changed')
      );

      // HeroService should make one PUT to heroesUrl
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(heroChanged);

      // Create response with heroChanged in body
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: heroChanged });
      req.event(expectedResponse);
    });

    it('#deleteHero : should delete one hero with id parameter', () => {
      const heroIdToDel = 51; // To test delete with hero id
      const heroDeleted = mockHeroes.find( // Hero which is suppose to be deleted
        hero => hero.id === heroIdToDel
      );

      heroService.deleteHero(heroIdToDel).subscribe(
        hero => expect(hero).toEqual(heroDeleted, 'should return hero deleted')
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl + '/' + heroIdToDel);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toBeNull();

      req.flush(heroDeleted);
    });

    it('#deleteHero : should delete one hero with hero parameter', () => {
      const heroIdToDel = 51; // To test delete with hero id
      const heroToDel = mockHeroes.find( // To test delete with hero
        hero => hero.id === heroIdToDel
      );

      heroService.deleteHero(heroToDel).subscribe(
        hero => expect(hero).toEqual(heroToDel, 'should return hero deleted')
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl + '/' + heroIdToDel);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toBeNull();

      req.flush(heroToDel);
    });

    it('#searchHero : should return one hero with term Pastaga', () => {
      const term = 'Pastaga';
      const heroesFound = mockHeroes.filter(
        hero => hero.name.match(term)
      );

      heroService.searchHeroes(term).subscribe(
        data => expect(data.length).toEqual(1, 'should return 1 hero')
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl + '/?name=' + term);
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();

      req.flush(heroesFound);
    });

    it('#searchHero : should return no heroes with term chacha', () => {
      const term = 'chacha';

      heroService.searchHeroes(term).subscribe(
        data => expect(data.length).toEqual(0, 'should not return any heroes')
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl + '/?name=' + term);
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();

      req.flush([]);
    });
  });
});
