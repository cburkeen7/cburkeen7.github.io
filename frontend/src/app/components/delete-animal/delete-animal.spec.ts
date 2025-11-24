import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAnimal } from './delete-animal.component';

describe('DeleteAnimal', () => {
  let component: DeleteAnimal;
  let fixture: ComponentFixture<DeleteAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAnimal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAnimal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
