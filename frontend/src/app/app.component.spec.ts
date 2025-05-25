import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EcommerceService } from './ecommerce/services/EcommerceService';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const ecommerceServiceSpy = jasmine.createSpyObj('EcommerceService', ['getAllProducts']);
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
    TestBed.createComponent(AppComponent).destroy();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const req = httpMock.expectOne('/api/products');
    req.flush([]);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render ecommerce component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const req = httpMock.expectOne('/api/products');
    req.flush([]);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-ecommerce')).toBeTruthy();
  }));
});
