import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticationGuard } from './core/guards/user-authentication.guard';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "item/:id",
    loadChildren: () => import('./pages/item-detail/item-detail.module').then(m => m.ItemDetailModule),
  },
  {
    path: "auth",
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: "cart",
    component: ItemDetailComponent,
    canActivate: [UserAuthenticationGuard]
  },
  {
    path: "user",
    component: ItemDetailComponent,
    canActivate: [UserAuthenticationGuard]
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
