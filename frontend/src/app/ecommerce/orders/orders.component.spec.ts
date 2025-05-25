import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EcommerceService } from '../services/EcommerceService';
import { ProductOrders } from '../models/product-orders.model';
import { of } from 'rxjs';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const ecommerceServiceSpy = jasmine.createSpyObj('EcommerceService', ['getAllProducts', 'saveOrder']);
    ecommerceServiceSpy.getAllProducts.and.returnValue(of([]));
    ecommerceServiceSpy.saveOrder.and.returnValue(of({}));
    ecommerceServiceSpy.ProductOrders = new ProductOrders();
    ecommerceServiceSpy.SelectedProductOrder = null;
    ecommerceServiceSpy.OrdersChanged = of();
    ecommerceServiceSpy.ProductOrderChanged = of();
    ecommerceServiceSpy.TotalChanged = of();
    ecommerceServiceSpy.Total = 0;

    TestBed.configureTestingModule({
      declarations: [OrdersComponent],
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
    fixture = TestBed.createComponent(OrdersComponent);
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
