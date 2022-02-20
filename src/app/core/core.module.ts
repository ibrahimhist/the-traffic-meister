import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { MaterialModule } from '@app/shared/modules/material/material.module';

import { CoreComponents } from './core-components.index';
import { ContainerCardComponent } from './subject-specific-components/cards/container-card/container-card.component';
import { OptionWithImageComponent } from './subject-specific-components/others/option-with-image/option-with-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxUiLoaderModule,
  ],
  declarations: [CoreComponents, ContainerCardComponent, OptionWithImageComponent],
  exports: [CoreComponents],
})
export class CoreModule {}
