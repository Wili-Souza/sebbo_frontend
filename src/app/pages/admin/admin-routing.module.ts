import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookModalComponent } from 'src/app/pages/admin/components/book-modal/book-modal.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "edit/:id",
        component: BookModalComponent,
      },
      {
        path: "create",
        component: BookModalComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }