import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('HeroService', () => {
  let mockMessageServie;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    mockMessageServie = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageServie }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getHero', () => {
    it('should call get with the correct URL', inject(
      [
        HeroService, HttpTestingController
      ],
      (service: HeroService, controller: HttpTestingController) => {
        // call getHero
        service.getHero(4).subscribe(res => {
          expect(res.id).toBe(4);
        });
        const req = controller.expectOne('api/heroes/4');
        req.flush({ id: 4, name: 'ahmed', strength: 100 });
        expect(req.request.method).toBe('GET');
        httpTestingController.verify();
      }));
  });
});
