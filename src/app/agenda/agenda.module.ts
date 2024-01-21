import { NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgendaPageRoutingModule } from './agenda-routing.module';
import { AgendaPage } from './agenda.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';

import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/es-EC';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [AgendaPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-EC' }
  ]
})
export class AgendaPageModule {}
