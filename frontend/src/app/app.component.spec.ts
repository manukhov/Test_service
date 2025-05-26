import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EcommerceService } from './ecommerce/services/EcommerceService';
import { ProductOrders } from './ecommerce/models/product-orders.model';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const ecommerceServiceSpy = jasmine.createSpyObj('EcommerceService', ['getAllProducts', 'saveOrder', 'reset']);
    ecommerceServiceSpy.getAllProducts.and.returnValue(of([]));
    ecommerceServiceSpy.saveOrder.and.returnValue(of({}));
    ecommerceServiceSpy.reset.and.returnValue(undefined);
    ecommerceServiceSpy.ProductOrders = new ProductOrders();
    ecommerceServiceSpy.SelectedProductOrder = null;
    ecommerceServiceSpy.OrdersChanged = of();
    ecommerceServiceSpy.ProductOrderChanged = of();
    ecommerceServiceSpy.TotalChanged = of();
    ecommerceServiceSpy.Total = 0;

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
    }).compileComponents();

    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush([]);
    expect(app).toBeTruthy();
  }));

  it('should render ecommerce component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush([]);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-ecommerce')).toBeTruthy();
  }));
});
