import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationStatus } from '../interfaces/application';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-new-application-dialog',
  templateUrl: './new-application-dialog.component.html',
  styleUrls: ['./new-application-dialog.component.scss']
})
export class NewApplicationDialogComponent {

  newApplicationForm: FormGroup = new FormGroup({
    company: new FormControl<string | null>(null, [Validators.required]),
    jobTitle: new FormControl<string | null>(null, [Validators.required]),
    location: new FormControl<string | null>(null, [Validators.required]),
    salary: new FormControl<number | null>(null),
    applicationStatus: new FormControl<ApplicationStatus>(ApplicationStatus.submitted, [Validators.required]),
    siteApplied: new FormControl<string | null>(null, [Validators.required]),
    dateApplied: new FormControl<Date>(new Date(), [Validators.required])
  })


  constructor(
    private dialog: MatDialogRef<NewApplicationDialogComponent>,
    private dataService: DataService
  ){}

  submitForm() {
    const { value } = this.newApplicationForm

    this.dataService.createApplication(value).subscribe(data => {
      console.log('did a new application create?', data)

      this.dialog.close()
    })
  }
  
}
