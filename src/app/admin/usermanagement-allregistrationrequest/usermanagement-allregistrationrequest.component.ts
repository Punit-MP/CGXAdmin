import { Component, OnInit } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';
// import { JwPaginationComponent } from 'jw-angular-pagination';
@Component({
  selector: 'app-usermanagement-allregistrationrequest',
  templateUrl: './usermanagement-allregistrationrequest.component.html',
  styleUrls: ['./usermanagement-allregistrationrequest.component.css']
})
export class UsermanagementAllregistrationrequestComponent implements OnInit {
  currentUser: any;
  tools: any;
  toolsData: any;
  pageOfItems: Array<any>;
  searchKey: any;
  toolsFilter: any;
  p = 1;
  constructor(private cgxService: CgxService, private router: Router,
              private authService: AuthService, private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('adminUser');
    this.allRegistration();
  }

  allRegistration() {
    this.cgxService.allRegistration().subscribe(res => {
      this.tools = res.result;
      this.toolsFilter = res.result;
      this.toolsFilter = this.toolsFilter?.map((user) => {
        return {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email, status: user.status,
          id: user.id,
          institution: user.institution
        };
      });
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  signout() {
    this.authService.adminSignout();
    this.router.navigate(['/admin']);
  }
  filterTable(value) {
    this.tools = this.toolsFilter;
    if (isNaN(value)) {
      this.tools = this.tools.filter((invoice) => this.isMatch(invoice));
    }
  }
  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item?.toString().toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1;
    }
  }

  deleteUser(id){
  //  console.log('id', id);
   this.confirmationService.confirm({
    message: 'Are you sure that you want to remove this User request?',
    accept: () => {
      this.cgxService.deleteUser(id).subscribe(() => {
        this.messageService.add({detail: 'User request deleted Successfully'});
        this.allRegistration();
      });
    },
    reject: () => {
      this.messageService.add({ detail: 'You have rejected'});
   }
  });
  }
  getUserDetails() {
    throw new Error('Method not implemented.');
  }
}
