import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriasPageRoutingModule } from './materias-routing.module';

import { MateriasPage } from './materias.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MateriasPage]
})
export class MateriasPageModule {}
