import { Component, OnInit } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-details-request',
  templateUrl: './details-request.component.html',
  styleUrls: ['./details-request.component.css']
})
export class DetailsRequestComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, public cgxService: CgxService, private router: Router,
              private authService: AuthService) { }
  currentUser: any;
  user: any;
  approveStatus: any;
  order: any;
  displayModalReject = false;
  displayModalAccept = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.currentUser = localStorage.getItem('user');
    this.adminUserDetails(id);
  }

  adminUserDetails(id) {
    this.cgxService.adminUserDetails(id).subscribe(res => {

      this.user = res.result;
      // console.log(this.user);
      this.order = res.result.order;
      // console.log(this.order);

    });

  }
  acceptUser(userid, status) {
    // const body = { id: userid, status: status };
    this.cgxService.adminApprove(userid, status).subscribe(res => {
      this.approveStatus = res;
      if (this.approveStatus.status == 200 && this.approveStatus.msg == 'Your User is now approved') {
        // this.messageService.add({ key: 'status', severity: 'success', summary: 'Success', detail: this.approveStatus.msg });
        this.showModalDialogAccept();
        // this.router.navigate(['/admin/usermanagement']);

      }
      else {
        this.showModalDialogReject();
        // this.messageService.add({ key: 'status', severity: 'error', summary: 'Failure', detail: this.approveStatus.msg });
      }

    });

  }
  showModalDialogAccept() {
    this.displayModalAccept = true;
  }
  showModalDialogReject() {
    this.displayModalReject = true;
  }
  redirect() {
    this.router.navigate(['/admin/usermanagement']);
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/admin']);
  }
}
