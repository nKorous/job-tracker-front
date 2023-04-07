import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Application, ApplicationStatus } from '../interfaces/application';
import { ApplicationNotes } from '../interfaces/application-notes';
import { MatDialog } from '@angular/material/dialog';
import { NewNoteDialogComponent } from '../new-note-dialog/new-note-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  applicationId: number = 0
  application: Application | null = null
  applicationNotes: ApplicationNotes[] = []

  applicationNotesSubscription: Subscription = new Subscription()

  contactedBack: boolean = false
  salary: string = ''
  applicationStatus: ApplicationStatus = ApplicationStatus.submitted

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private matDialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.applicationId = this.activatedRoute.snapshot.params['id']
    this.getApplication()
    this.getApplicationNotes()
    }

  getApplication() {
    this.dataService.getApplication(this.applicationId)
      .subscribe(data => {
        console.log('application', data)
        this.application = data[0]
        this.contactedBack = this.application?.contacted_back
        this.salary = this.application?.salary ? this.application?.salary.toString() : '0'
        this.applicationStatus = this.application?.application_status
      })
  }

  getApplicationNotes() {
    this.applicationNotesSubscription = this.dataService.getNotes(this.applicationId).subscribe(notes => {
      console.log('application Notes', notes)
      this.applicationNotes = notes
    })
  }

  updateContactedBack() {
    this.dataService.updateContactedBack({contactedBack: this.contactedBack, id: this.applicationId}).subscribe(() => {
    })
  }

  updateSalary() {
    this.dataService.updateSalary({salary: Number(this.salary), id: this.applicationId}).subscribe(() => {})
  }

  updateApplicationStatus() {
    this.dataService.updateApplicationStatus({applicationStatus: this.applicationStatus, id: this.applicationId}).subscribe(() => {})
  }

  openCreateNewNoteDialog() {
    const dialog = this.matDialog.open(NewNoteDialogComponent, {
      width: '55%',
      height: '55%',
      data: this.applicationId
    })

    dialog.afterClosed().subscribe(() => {
      this.applicationNotesSubscription.unsubscribe()
      this.getApplicationNotes()
      this.cd.markForCheck()
    })
  }

}
