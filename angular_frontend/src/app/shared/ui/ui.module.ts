import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './widgets/button.component';
import { InputComponent } from './widgets/input.component';
import { FormFieldComponent } from './widgets/form-field.component';
import { CardComponent } from './widgets/card.component';
import { ModalComponent } from './widgets/modal.component';
import { NavbarComponent } from './widgets/navbar.component';
import { SidebarComponent } from './widgets/sidebar.component';
import { TabsComponent } from './widgets/tabs.component';
import { AlertComponent } from './widgets/alert.component';
import { ToastComponent } from './widgets/toast.component';
import { LoaderComponent } from './widgets/loader.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * Shared UI module exporting reusable, accessible components.
 */
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ButtonComponent,
    InputComponent,
    FormFieldComponent,
    CardComponent,
    ModalComponent,
    NavbarComponent,
    SidebarComponent,
    TabsComponent,
    AlertComponent,
    ToastComponent,
    LoaderComponent
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    FormFieldComponent,
    CardComponent,
    ModalComponent,
    NavbarComponent,
    SidebarComponent,
    TabsComponent,
    AlertComponent,
    ToastComponent,
    LoaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UiModule {}
