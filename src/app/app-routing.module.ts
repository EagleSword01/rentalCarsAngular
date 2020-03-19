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

const appRoutes: Routes = [
    {path: '', redirectTo: '/rentals', pathMatch: 'full'},
    {path: 'clients', component: ClientsComponent },
    {path: 'rentals', component: RentalsComponent },
    {path: 'cars', component: CarsComponent },
    {path: 'newclient', component: NewClientComponent },
    {path: 'newrental', component: NewRentalComponent },
    {path: 'newcar', component: NewCarComponent },
    {path: 'clientedit/:id',component: ClientEditComponent },
    {path: 'caredit/:id',component: CarEditComponent },
    {path: 'rentaledit/:id',component: RentalEditComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}
