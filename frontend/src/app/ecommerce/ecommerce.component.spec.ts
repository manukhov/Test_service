import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EcommerceComponent } from './ecommerce.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EcommerceService } from './services/EcommerceService';

describe('EcommerceComponent', () => {
  let component: EcommerceComponent;
  let fixture: ComponentFixture<EcommerceComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const ecommerceServiceSpy = jasmine.createSpyObj('EcommerceService', ['getAllProducts']);
    TestBed.configureTestingModule({
      declarations: [
        EcommerceComponent,
        ProductsComponent,
        ShoppingCartComponent,
        OrdersComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: EcommerceService, useValue: ecommerceServiceSpy }]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceComponent);
    component = fixture.componentInstance;
    const req = httpMock.expectOne('/api/products');
    req.flush([]);
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
