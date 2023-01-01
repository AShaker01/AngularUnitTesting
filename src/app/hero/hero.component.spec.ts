import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });
  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'ahmed', strength: 8 };
    fixture.detectChanges();
    expect(fixture.componentInstance.hero.name).toEqual('ahmed');
  });
  it('should render the name in anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'ahmed', strength: 8 };
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('a'));
    expect(de.nativeElement.textContent).toContain('ahmed');
    //expect(fixture.nativeElement.querySelector('a').textContent).toContain('ahmed');
  });
});
