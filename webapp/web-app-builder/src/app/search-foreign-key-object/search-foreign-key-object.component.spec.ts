import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForeignKeyObjectComponent } from './search-foreign-key-object.component';

describe('SearchForeignKeyObjectComponent', () => {
  let component: SearchForeignKeyObjectComponent;
  let fixture: ComponentFixture<SearchForeignKeyObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchForeignKeyObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForeignKeyObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
