import { Component, OnInit } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tooldetails',
  templateUrl: './tooldetails.component.html',
  styleUrls: ['./tooldetails.component.css']
})
export class TooldetailsComponent implements OnInit {
  currentUser: any;
  tool: any = [];
  constructor(private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute, public cgxService: CgxService,
              private router: Router, private messageService: MessageService, private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.currentUser = localStorage.getItem('user');
    this.adminToolsDetails(id);
  }

  adminToolsDetails(id) {
    this.cgxService.admintoolDetails(id).subscribe(res => {
      this.tool = res.result;
    });

  }
  removeTool(toolID) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this tool?',
      accept: () => {
        this.cgxService.adminDeleteTool(toolID).subscribe(s => {
          this.messageService.add({ key: 'resetKey', detail: 'Tool Deleted Successfully' });
          setTimeout(() => {
            this.router.navigate(['/admin/crunchboxtools']);
          }, 1000);
        });
      },
      reject: () => {
        this.messageService.add({ key: 'resetKey', detail: 'You have rejected' });
      }
    });
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/admin']);
  }
}
