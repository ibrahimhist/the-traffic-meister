import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class MaterialModule {}
