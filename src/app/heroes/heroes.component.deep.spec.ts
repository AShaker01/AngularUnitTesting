import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any;
  onClick() {
    this.navigateTo = this.linkParams;
  }
}
describe('HeroesComponent (deep) Test', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      { id: 1, name: 'ahmed', strength: 8 },
      { id: 2, name: 'ahmed2', strength: 81 }
    ];
    TestBed.configureTestingModule({
      declarations:
        [HeroesComponent,
          RouterLinkDirectiveStub,
          HeroComponent],
      //schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);

  });
  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit()
    fixture.detectChanges();

    let heroComponentsDE = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentsDE.length).toEqual(2);
    const heroComponents = heroComponentsDE.map(c => c.componentInstance as HeroComponent);
    for (let i = 0; i < heroComponents.length; i++) {
      expect(heroComponents[i].hero).toEqual(HEROES[i]);
    }
  });
  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit()
    fixture.detectChanges();

    let heroComponentsDE = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // heroComponentsDE[0].query(By.css('button'))
    //   .triggerEventHandler('click', { stopPropagation: () => { } });
    // this
    (<HeroComponent>heroComponentsDE[0].componentInstance).delete.emit(undefined);
    //or
    heroComponentsDE[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });
  it('should create a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = "sliem";
    mockHeroService.addHero.and.returnValue(of({ id: 10, name: name, strength: 20 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = name;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);

  });
  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    let heroComponentsDE = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let routerLink = heroComponentsDE[0].query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);
    heroComponentsDE[0].query(By.css('a')).triggerEventHandler('click', null);
    console.log(routerLink.navigateTo);
    expect(routerLink.navigateTo).toBe('/detail/1');
  });
})
