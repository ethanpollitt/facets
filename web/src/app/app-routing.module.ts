import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: 'clients', component: ClientComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: '**', redirectTo: '/clients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
