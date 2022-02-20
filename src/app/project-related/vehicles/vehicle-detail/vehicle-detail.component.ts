import { Component, Input, OnInit } from '@angular/core';
import { SelectedVehicle } from '@app/shared/models/vehicle.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent implements OnInit {
  @Input() vehicle: SelectedVehicle;

  constructor() {}

  ngOnInit(): void {}
}
