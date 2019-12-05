import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDataComponent } from '../show-data/show-data.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  { path: 'show-data/:typeData', component: ShowDataComponent },
  { path: '', component: AppComponent},
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}