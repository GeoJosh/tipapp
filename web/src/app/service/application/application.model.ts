export interface CreateApplicationRequest {
  first_name: string;
  last_name: string;
  venmo_username: string;
  email: string;
  employer: string;
  employment_information: string;
}

export interface GetApplicationResponse {
  first_name: string;
  venmo_username: string;
  email: string;
  employer: string;
  employment_information: string;
}
