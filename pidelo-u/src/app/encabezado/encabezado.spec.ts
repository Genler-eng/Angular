import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Encabezado } from './encabezado';

describe('Encabezado', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Encabezado],
      providers: [provideRouter([])], // le damos un router vacío a la prueba
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Encabezado);
    expect(fixture.componentInstance).toBeTruthy();
  });
});