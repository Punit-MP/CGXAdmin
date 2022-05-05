import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService} from 'primeng/api';
import { ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [ CommonModule, RouterModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],

  exports: [HeaderComponent, FooterComponent, SidebarComponent]
})
export class SharedModule { }
