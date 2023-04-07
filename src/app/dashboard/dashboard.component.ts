import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Application, ApplicationStatus } from '../interfaces/application';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  applications: Application[] = []
  interviewsScheduled: Application[] = []
  waitingOnMe: Application[] = []
  contactedBack: Application[] = []

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getApplications()
  }

  getApplications() {
    this.dataService.getApplications().subscribe(applications => {
      this.applications = applications

      this.interviewsScheduled = applications.filter(fi => fi.application_status === ApplicationStatus.interviewScheduled)
      this.waitingOnMe = applications.filter(fi => fi.application_status === ApplicationStatus.waitingOnMe)
      this.contactedBack = applications.filter(fi => fi.contacted_back)
    })
  }

  navToApplicationDetail(row: Application) {
    this.router.navigate([`/application/${row.id}`])
  }
}
