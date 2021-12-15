import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';

//SERVICE JS
import { CargarScriptsService } from './services/cargar-scripts.service';
import { BookingRoutingModule } from '../../booking-routing.module';
import { DoktoLayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectServiceModalComponent } from './select-service-modal/select-service-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [HomeComponent, SelectServiceModalComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    DoktoLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    BookingRoutingModule,
    MatSnackBarModule,
    SharedModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  providers: [
  ],
})
export class HomeModule { }
