import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPrincipalPageRoutingModule } from './tab-principal-routing.module';

import { TabPrincipalPage } from './tab-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPrincipalPageRoutingModule
  ],
  declarations: [TabPrincipalPage]
})
export class TabPrincipalPageModule {}
