import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../cal-modal/cal-modal.page';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  eventSource = [];
  viewTitle: string | undefined;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  selectedDate: Date | undefined;

  @ViewChild(CalendarComponent) myCal: CalendarComponent | undefined;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadSpecialDates();
  }

  loadSpecialDates() {
    this.http.get('assets/data.json').subscribe((data: any) => {
      if (
        data &&
        data.CalendarioEstudiantil &&
        data.CalendarioEstudiantil.fechasEspeciales
      ) {
        this.addSpecialDatesToEventSource(
          data.CalendarioEstudiantil.fechasEspeciales
        );
      }
    });
  }

  addSpecialDatesToEventSource(specialDates: { fecha: string, nombre: string }[]) {
    const events = [];
    for (const { fecha, nombre } of specialDates) {
      const date = new Date(fecha + 'T00:00:00Z');
      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setUTCDate(date.getUTCDate() + 1);
  
      events.push({
        title: nombre, // Utilizamos el nombre del evento en lugar de 'Evento Especial'
        startTime: startTime,
        endTime: endTime,
        allDay: true,
      });
    }
    this.eventSource = events;
    this.myCal.loadEvents();
  }
  
  

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title: string | undefined) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  removeEvents() {
    this.eventSource = [];
  }
  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }
}
