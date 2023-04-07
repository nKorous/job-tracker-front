import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Application } from '../interfaces/application';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewApplicationDialogComponent } from '../new-application-dialog/new-application-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {
  applications: MatTableDataSource<Application> = new MatTableDataSource()
  applicationSubscription: Subscription = new Subscription()
  displayedColumns: string[] = ['id', 'company', 'job_title', 'location', 'salary', 'contacted_back', 'application_status', 'site_applied', 'date_applied']


  constructor(
    private dataService: DataService, 
    private matDialog: MatDialog,
    private cd: ChangeDetectorRef,
    private router: Router) {}

  ngOnInit(): void {
    this.getApplications()
  }

  ngOnDestroy(): void {
    this.applicationSubscription.unsubscribe()
  }

  getApplications() {
    this.applicationSubscription = this.dataService.getApplications().subscribe(data => {
      this.applications = new MatTableDataSource(data)
    })
  }

  rowClicked(row: Application) {
    this.router.navigate([`/application/${row.id}`])
  }

  triggerNewApplicationModal() {
    let dialog = this.matDialog.open(NewApplicationDialogComponent, {
      height: '75%',
      width: '75%'
    })

    dialog.afterClosed().subscribe(() => {
        this.applicationSubscription.unsubscribe()
        this.getApplications()
        this.cd.markForCheck()
    })
  }

}
