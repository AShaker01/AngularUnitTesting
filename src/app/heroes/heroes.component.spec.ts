import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let mockHeroService;
  let HEROES;
  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'ahmed', strength: 8 },
      { id: 2, name: 'ahmed2', strength: 81 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });
  describe('delete', () => {
    it('should delete indicated hero from the heroes list', () => {
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.delete(HEROES[1]);
      expect(component.heroes.length).toBe(1);
    });
    it('deleteHero should be called',()=>{
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.delete(HEROES[1]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });
  });
});
