import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPrincipalPage } from './tab-principal.page';

const routes: Routes = [
  {
    path: '',
    component: TabPrincipalPage,
    children:[
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'clases',
        loadChildren: () => import('./../clases/clases.module').then( m => m.ClasesPageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('./../agenda/agenda.module').then( m => m.AgendaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPrincipalPageRoutingModule {}
