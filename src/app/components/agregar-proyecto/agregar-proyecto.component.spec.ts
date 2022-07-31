import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProyectoComponent } from './agregar-proyecto.component';

describe('AgregarProyectoComponent', () => {
  let component: AgregarProyectoComponent;
  let fixture: ComponentFixture<AgregarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
