import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NativeFeaturePage } from './native-feature.page';

describe('NativeFeaturePage', () => {
  let component: NativeFeaturePage;
  let fixture: ComponentFixture<NativeFeaturePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NativeFeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
