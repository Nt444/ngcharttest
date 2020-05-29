import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTradesComponent } from './table-trades.component';

describe('TableTradesComponent', () => {
  let component: TableTradesComponent;
  let fixture: ComponentFixture<TableTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
