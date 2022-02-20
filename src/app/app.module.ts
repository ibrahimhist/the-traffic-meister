import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/modules/material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';

import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { ProjectRelatedComponents } from './project-related/project-related-components.index';

import { LoadingService } from './shared/services/loading.service';
import { VehiclesService } from './shared/services/vehicles/vehicles.service';
import { MessageHandlingService } from './shared/services/message-handling.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  hasProgressBar: false,
  overlayColor: 'rgba(40,40,40,.1)',
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ...ProjectRelatedComponents,
    VehiclesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    MaterialModule,
    CoreModule,
  ],
  providers: [LoadingService, VehiclesService, MessageHandlingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
