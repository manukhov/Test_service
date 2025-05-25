import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EcommerceService } from '../services/EcommerceService';
import { ProductOrders } from '../models/product-orders.model';
import { of } from 'rxjs';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const ecommerceServiceSpy = jasmine.createSpyObj('EcommerceService', ['getAllProducts'], {
      ProductOrders: new ProductOrders(),
      SelectedProductOrder: null,
      OrdersChanged: of(),
      ProductOrderChanged: of()
    });
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
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
    fixture = TestBed.createComponent(ShoppingCartComponent);
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
