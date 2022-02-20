import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
