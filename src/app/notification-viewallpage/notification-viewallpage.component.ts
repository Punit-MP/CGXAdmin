import { Component, OnInit } from '@angular/core';
import { CgxService } from '../services/cgx.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-notification-viewallpage',
  templateUrl: './notification-viewallpage.component.html',
  styleUrls: ['./notification-viewallpage.component.css']
})
export class NotificationViewallpageComponent implements OnInit {
  // currentUser: any;
  notifications: any;
  unread: any;
  read: any;
  constructor(public cgxService: CgxService, private messageService: MessageService) { }


  ngOnInit(): void {
    // this.currentUser = localStorage.getItem('user');
    this.getNotification();
  }
  getNotification() {
    this.cgxService.getUserNotification().subscribe(res => {
      this.notifications = res.data;
      console.log(this.notifications);
      this.unread = res.data.unread;
      this.read = res.data.read;
      // console.log(this.unread);
    });
  }
  removenotification(id) {
    console.log(id);
    this.cgxService.deleteNotification(id).subscribe(() => {
      this.messageService.add({ detail: 'Notification  Deleted Successfully' });
      this.getNotification();
    });
    //   this.confirmationService.confirm({
    //           message: 'Are you sure that you want to remove notification ?',
    //           accept: () => {
    //             //console.log('test');
    //              this.cgxService.deleteNotification(id).subscribe(s=> {
    //              this.messageService.add({ key: 'resetKey', severity: 'success', summary: 'Success',
    //  detail: 'Notification  Deleted Successfully' });
    //             });

    //           },
    //            reject: () => {
    //               this.messageService.add({key: 'resetKey',severity:'info', summary:'Rejected', detail:'You have rejected'});
    //           }
    //       });

    // }
  }
}
