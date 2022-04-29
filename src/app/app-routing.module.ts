import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: "item/:id",
    loadChildren: () => import('./pages/item-detail/item-detail.module').then(m => m.ItemDetailModule),
  },
  {
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: "cart",
    redirectTo: "login"
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
