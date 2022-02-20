import { CommonModule } from '@angular/common';
import { SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { IVehicle } from '@app/shared/models/vehicle.model';
import { MaterialModule } from '@app/shared/modules/material/material.module';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { VehiclesService } from '@app/shared/services/vehicles/vehicles.service';

import { VehicleFormComponent } from './vehicle-form.component';

const dummyData = [
  {
    id: 1,
    type: 'car',
    brand: 'Bugatti Veyron',
    colors: ['red', 'black'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
  },
  {
    id: 2,
    type: 'airplane',
    brand: 'Boeing 787 Dreamliner',
    colors: ['red', 'white', 'black', 'green'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg',
  },
  {
    id: 3,
    type: 'train',
    brand: 'USRA 0-6-6',
    colors: ['yellow', 'white', 'black'],
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/UP_4466_Neil916.JPG/600px-UP_4466_Neil916.JPG',
  },
  {
    id: 4,
    type: 'airplane',
    brand: 'Canadair North Star',
    colors: ['red', 'blue', 'yellow', 'green'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/BOAC_C-4_Argonaut_Heathrow_1954.jpg/600px-BOAC_C-4_Argonaut_Heathrow_1954.jpg',
  },
];

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;

  let vehiclesService: VehiclesService;
  const formBuilder: FormBuilder = new FormBuilder();

  const getElement = (elementId: string) =>
    fixture.debugElement.query(By.css(`[data-testid="${elementId}"]`));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFormComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
      ],

      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        MessageHandlingService,
        VehiclesService,
      ],
    }).compileComponents();

    vehiclesService = TestBed.inject(VehiclesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disabled when no vehicles provided', () => {
    // Arrange
    component.vehicles = [];
    component.ngOnChanges({
      vehicles: new SimpleChange(null, 'vehicles', true),
    });
    //  Act
    fixture.detectChanges();

    //  Assertion
    expect(component.vehicleForm.disabled).toBeTruthy();
  });

  it('should NOT disabled when vehicles provided', () => {
    // Arrange
    component.vehicles = dummyData;
    component.ngOnChanges({
      vehicles: new SimpleChange(null, 'vehicles', true),
    });
    //  Act
    fixture.detectChanges();

    //  Assertion
    expect(component.vehicleForm.disabled).toBeFalsy();
  });

  it('all form element selected should omit selectedVehicle', fakeAsync(() => {
    // Arrange
    component.vehicles = dummyData;
    component.ngOnChanges({
      vehicles: new SimpleChange(null, 'vehicles', true),
    });
    //  Act
    spyOn(component.selectedVehicle, 'emit');

    component.vehicleForm.patchValue({
      type: dummyData[0].type,
      id: dummyData[0].id,
      color: dummyData[0].colors[0],
    });
    fixture.detectChanges();
    tick(100);
    //  Assertion
    expect(component.selectedVehicle.emit).toHaveBeenCalled();
  }));

  it('should set selects datasources: vehicleTypes, brands, colors', () => {
    // Arrange
    component.vehicles = dummyData;
    component.ngOnChanges({
      vehicles: new SimpleChange(null, 'vehicles', true),
    });
    //  Act
    const vehicleTypes = [...new Set(dummyData.map((x) => x.type))];
    const brands = dummyData;

    let colors: string[] = [];
    dummyData.forEach((item) => colors.push(...item.colors));
    colors = [...new Set(colors)];

    //  Assertion
    vehicleTypes.forEach((x) =>
      expect(component.vehicleTypes.some((y) => y.label === x)).toBeTruthy()
    );
    brands.forEach((x) =>
      expect(component.brands.some((y) => y === x)).toBeTruthy()
    );

    colors.forEach((x) => expect(component.colors.includes(x)).toBeTruthy());
  });

  it('should filter brands and colors when type selected', fakeAsync(() => {
    // Arrange
    component.vehicles = dummyData;
    component.ngOnChanges({
      vehicles: new SimpleChange(null, 'vehicles', true),
    });
    //  Act
    const type = 'airplane';
    component.vehicleForm.patchValue({
      type,
    });
    fixture.detectChanges();
    tick(100);

    let colors: string[] = [];
    const brands: IVehicle[] = [];

    dummyData
      .filter((x) => x.type === type)
      .forEach((item) => {
        colors.push(...item.colors);
        brands.push(item);
      });
    colors = [...new Set(colors)];

    //  Assertion
    expect(component.colors.length).toBe(colors.length);
    colors.forEach((x) => expect(component.colors.includes(x)).toBeTruthy());

    expect(component.brands.length).toBe(brands.length);
    brands.forEach((x) =>
      expect(component.brands.find((y) => y === x)).toBeTruthy()
    );
  }));
});
