import { Component, OnInit } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-crunchboxtools',
  templateUrl: './crunchboxtools.component.html',
  styleUrls: ['./crunchboxtools.component.css']
})
export class CrunchboxtoolsComponent implements OnInit {
  currentUser: any;
  crunchtools: any;
  crunchtoolsFilter: any;
  searchKey: any;
  p = 1;
  constructor(private cgxService: CgxService, private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.getTools();
  }
  getTools() {
    this.cgxService.getTools().subscribe(res => {
      this.crunchtools = res.result;
      this.crunchtoolsFilter = this.crunchtools;
      if (this.crunchtoolsFilter){
      this.crunchtoolsFilter = this.crunchtoolsFilter?.map((user) => {
        return {
          tool_name: user.tool_name,
          short_description: user.short_description,
          price: user.price,
          id: user.id
        };
      });
    }
    });

  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/admin']);
  }

  filterTable(value) {
    this.crunchtools = this.crunchtoolsFilter;
    this.crunchtools = this.crunchtools.filter((invoice) => this.isMatch(invoice));
  }
  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item?.toString().toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1;
    }
  }

}
