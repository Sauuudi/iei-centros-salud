import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaComponent } from './formulario-carga.component';

describe('FormularioCargaComponent', () => {
  let component: FormularioCargaComponent;
  let fixture: ComponentFixture<FormularioCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
