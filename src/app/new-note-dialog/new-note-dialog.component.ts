import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewApplicationNote } from '../interfaces/application-notes';

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss']
})
export class NewNoteDialogComponent {
  jobKey: string | null = null

  newNoteFormGroup: FormGroup = new FormGroup({
    noteTitle: new FormControl<string | null>(null),
    noteBody: new FormControl<string | null>(null, [Validators.required])
  })

  constructor(
    private matDialog: MatDialogRef<NewNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string,
    private dataService: DataService
  ) {
    this.jobKey = data
  }


  createNewNote() {
    const { value } = this.newNoteFormGroup

    const newNote: NewApplicationNote = {
      jobKey: Number(this.jobKey),
      noteTitle: value.noteTitle,
      noteBody: value.noteBody
    }

    this.dataService.createNote(newNote).subscribe(() => {
      this.matDialog.close()
    })
  }

}
