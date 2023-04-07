export interface ApplicationNotes {
    id: number;
    job_key: number;
    note_title: string;
    note_body: string;
}

export interface NewApplicationNote {
    jobKey: number;
    noteTitle: string;
    noteBody: string;
}