import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EcommerceService } from '../services/EcommerceService';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [EcommerceService]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
