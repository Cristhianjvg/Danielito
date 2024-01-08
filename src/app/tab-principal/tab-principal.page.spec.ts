import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPrincipalPage } from './tab-principal.page';

describe('TabPrincipalPage', () => {
  let component: TabPrincipalPage;
  let fixture: ComponentFixture<TabPrincipalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
