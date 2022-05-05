import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CgxService } from '../../services/cgx.service';
import { DatePipe } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  // headernotifications:any;
  headernotify: any;
  headerunread: any = [];
  currentUser: any;
  unreadcount: number;
  crunchVar1 = 'CrunchBox';
  crunchVar2 = ' Tools';
  accountVar1 = 'Account';
  accountVar2 = ' Information';
  authtoken: any;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private cgxService: CgxService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem('user');
    if (this.currentUser && this.currentUser[0]){
      this.currentUser = this.currentUser[0]?.toUpperCase() + this.currentUser?.slice(1);
    }
    this.authtoken = this.activatedRoute.snapshot.params.authtoken;
    if (this.authtoken != undefined) {
    }
    else {
      this.getNotification();
    }
  }

  getNotification() {
    this.cgxService.getUserNotification().subscribe(res => {
      this.headernotify = res.data;
      this.headerunread = res.data?.unread;
      this.unreadcount = this.headernotify?.pending_count.unread_notifications;
    });
  }
  updateNotify(data) {
    const dataNotification = {
      notification_id: data.notification_id,
      status: 1
    };
    // console.log(dataNotification);
    this.cgxService.updateUserNotification(dataNotification).subscribe(() => {

      // console.log(res);
    });
  }
  removenotification(id) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove notification?',
      accept: () => {
        // console.log('test');
        this.cgxService.deleteNotification(id).subscribe(() => {
          this.messageService.add({detail: 'Notification  Deleted Successfully' });
        });
        this.getNotification();
      },
      reject: () => {
        this.messageService.add({ detail: 'You have rejected' });
      }
    });

  }
}
