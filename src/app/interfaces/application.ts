export interface Application {
    id: number;
    company: string;
    job_title: string;
    location: string;
    salary: number;
    contacted_back: boolean;
    application_status: ApplicationStatus,
    site_applied: SiteApplied
    date_applied: Date
}

export interface NewApplication {
    company: string;
    jobTitle: string;
    location: string;
    salary: number;
    contactedBack: boolean;
    applicationStatus: ApplicationStatus,
    siteApplied: SiteApplied
    dateApplied: Date
}

export enum ApplicationStatus {
    submitted = 'submitted',
    interviewScheduled = 'interviewScheduled',
    companyNotInterested = 'companyNotInterested',
    hired = 'hired',
    waitingOnCompany = 'waitingOnCompany',
    waitingOnMe = 'waitingOnMe',
    offerPending = 'offerPending'
}

type SiteApplied = 'LinkedIn' | 'Glassdoor' | 'Indeed' | 'Company Site' | 'Recruiter'
