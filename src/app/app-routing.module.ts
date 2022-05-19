import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticationGuard } from './core/guards/user-authentication.guard';

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
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [UserAuthenticationGuard]
  },
  {
    path: "user",
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [UserAuthenticationGuard]
  },
  {
    path: "admin",
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [UserAuthenticationGuard]
  },
  {
    path: "**",
    redirectTo: "/home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
