import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router"
import { CarsComponent } from "./cars/cars.component";
import { ClientsComponent } from "./clients/clients.component";
import { RentalsComponent } from "./rentals/rentals.component";
import { NewClientComponent } from "./clients/new-client/new-client.component";
import { NewRentalComponent } from "./rentals/new-rental/new-rental.component";
import { NewCarComponent } from "./cars/new-car/new-car.component";
import { ClientEditComponent } from "./clients/client-edit/client-edit.component";
import { CarEditComponent } from "./cars/car-edit/car-edit.component";
import { RentalEditComponent } from "./rentals/rental-edit/rental-edit.component";
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/rentals', pathMatch: 'full'},
    {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard], },
    {path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard],},
    {path: 'cars', component: CarsComponent, canActivate: [AuthGuard] },
    {path: 'newclient', component: NewClientComponent, canActivate: [AuthGuard] },
    {path: 'newrental', component: NewRentalComponent, canActivate: [AuthGuard] },
    {path: 'newcar', component: NewCarComponent, canActivate: [AuthGuard] },
    {path: 'clientedit/:id',component: ClientEditComponent, canActivate: [AuthGuard] },
    {path: 'caredit/:id',component: CarEditComponent, canActivate: [AuthGuard] },
    {path: 'rentaledit/:id',component: RentalEditComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}
