import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IVehicle, SelectedVehicle } from '@app/shared/models/vehicle.model';
import { VehiclesService } from '@app/shared/services/vehicles/vehicles.service';

@UntilDestroy()
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  vehicles: IVehicle[];
  selectedVehicle: SelectedVehicle;

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  // get lists and maps accordings to their types
  getVehicles(): void {
    this.vehiclesService
      .getVehicles()
      .pipe(untilDestroyed(this))
      .subscribe((vehicles: IVehicle[]) => {
        this.vehicles = vehicles;
      });
  }

  onSelectedVehicle(vehicle: SelectedVehicle): void {
    this.selectedVehicle = vehicle;
  }
}
