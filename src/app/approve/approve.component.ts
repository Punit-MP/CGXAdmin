import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CgxService } from '../services/cgx.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  id: number;
  status: number;
  // tslint:disable-next-line:variable-name
  blocked_approve_Wait = false;
  value: any;
  currentUser: any;
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
              private messageService: MessageService, private cgxService: CgxService, private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.id = this.activatedRoute.snapshot.queryParams.id;
    this.status = this.activatedRoute.snapshot.queryParams.status;
    const body = { id: this.id, status: this.status };
    this.http.put<any>(`${environment.cgxApiUrl}/user/get-approve-disapprove/${this.id}/${this.status}`, body)
      .subscribe(res => {
        const data: any = res;
        if (data.msg == 'Your User is now Approved') {
          this.messageService.add({ key: 'approveKey',  detail: data.msg });
        }
        else {
          this.messageService.add({ key: 'approveKey', detail: data.msg });
        }
      });
  }


  signout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }

}
