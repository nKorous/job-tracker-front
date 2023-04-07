import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application, ApplicationStatus } from '../interfaces/application';
import { ApplicationNotes, NewApplicationNote } from '../interfaces/application-notes';

const SERVER_BASE_URL = 'http://localhost:8888'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getApplications() {
    return this.http.get<Application[]>(`${SERVER_BASE_URL}/jobs`)
  }

  getApplication(jobKey: number) {
    return this.http.get<Application[]>(`${SERVER_BASE_URL}/job?jobKey=${jobKey}`)
  }

  getNotes(applicationId: number) {
    return this.http.get<ApplicationNotes[]>(`${SERVER_BASE_URL}/jobNotes?jobKey=${applicationId}`)
  }

  createApplication(newApplication: Application) {
    return this.http.post<Application>(`${SERVER_BASE_URL}/job`, newApplication)
  }

  createNote(newApplicationNote: NewApplicationNote) {
    return this.http.post<ApplicationNotes>(`${SERVER_BASE_URL}/note`, newApplicationNote)
  }

  updateContactedBack(body: { contactedBack: boolean, id: number}) {
    return this.http.post<any>(`${SERVER_BASE_URL}/updateContactedBack`, body)
  }

  updateApplicationStatus(body: { applicationStatus: ApplicationStatus, id: number}) {
    return this.http.post<any>(`${SERVER_BASE_URL}/updateApplicationStatus`, body)
  }

  updateSalary(body: {salary: number, id: number}) {
    return this.http.post<any>(`${SERVER_BASE_URL}/updateSalary`, body)
  }

}
