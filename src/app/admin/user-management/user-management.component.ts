import { Component, OnInit } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  currentUser: any;
  tools: any;
  searchKey: any;
  toolsFilter: any;
  p = 1;
  constructor(private cgxService: CgxService, private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('adminUser');
    this.getNewRegisterUser();
  }

  getNewRegisterUser() {
    this.cgxService.newNegistration().subscribe(res => {
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
}
