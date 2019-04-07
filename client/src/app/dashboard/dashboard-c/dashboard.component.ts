import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../general-services/auth.service'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  
  userName = '';
  constructor ( 
    private authService: AuthService
  ) {
    
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.userName;
  }




  

 
}
