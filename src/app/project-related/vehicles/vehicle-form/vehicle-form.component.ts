import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { vehicleTypeImagesConstant } from '@app/shared/contants/vehicle-type-images.contant';
import { IVehicle, SelectedVehicle } from '@app/shared/models/vehicle.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit, OnChanges {
  @Input() vehicles: IVehicle[];
  @Output() selectedVehicle: EventEmitter<SelectedVehicle> =
    new EventEmitter<SelectedVehicle>();

  vehicleTypeImages = vehicleTypeImagesConstant;

  vehicleForm: FormGroup;

  vehicleTypes: { label: string; img: string }[];
  brands: IVehicle[];
  colors: string[];

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      type: '',
      id: '',
      color: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicles']) {
      if (this.vehicles?.length) {
        this.filterVehiclesandFillSelects();
        this.vehicleForm.enable();
      } else {
        this.vehicleForm.disable();
      }
    }
  }

  ngOnInit(): void {
    // checks all field selected, then emit
    this.vehicleForm.valueChanges
      .pipe(debounceTime(10), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((newValue: SelectedVehicle) => {
        const props = [newValue.type, newValue.id as any, newValue.color];
        this.filterVehiclesandFillSelects(...props);

        if (!props.some((x) => !x)) {
          const foundVehicle = this.brands.find((x) => x.id === newValue.id);
          this.selectedVehicle.emit({
            ...foundVehicle,
            color: newValue.color,
          } as SelectedVehicle);
        } else {
          this.selectedVehicle.emit();
        }
      });
  }

  filterVehiclesandFillSelects(type?: string, id?: number, color?: string) {
    const vehicleTypes: string[] = [];
    const brands: IVehicle[] = [];
    const colors: string[] = [];

    this.vehicles.forEach((vehicle: IVehicle) => {
      const typeCheckFailed = type && vehicle.type !== type;
      const idCheckFailed = id && vehicle.id !== id;
      const colorCheckFailed = color && !vehicle.colors.includes(color);

      // vehicle list condition
      let pass = true;
      if (idCheckFailed) pass = false;
      else if (colorCheckFailed) pass = false;
      if (pass) vehicleTypes.push(vehicle.type);

      // brand list condition
      pass = true;
      if (typeCheckFailed) pass = false;
      else if (colorCheckFailed) pass = false;
      if (pass) brands.push(vehicle);

      // color list condition
      pass = true;
      if (typeCheckFailed) pass = false;
      else if (idCheckFailed) pass = false;
      if (pass) colors.push(...vehicle.colors);
    });

    // sorting brands
    this.brands = brands.sort((a: IVehicle, b: IVehicle) =>
      a.brand.localeCompare(b.brand)
    );
    // sorting and getting only unique
    this.colors = [...new Set(colors)].sort();
    // sorting, getting only unique and adding img according to type
    this.vehicleTypes = [...new Set(vehicleTypes)].sort().map((x: string) => ({
      label: x,
      img: this.vehicleTypeImages[x] || this.vehicleTypeImages['other'],
    }));
  }
}
