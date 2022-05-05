export interface Token {
  status: number;
  result: Result;
  msg: string;
}

export interface Result {
  name: string;
  email: string;
  id: number;
  token: string;
}

export interface ApplicationUser {
  email: string;
  token: string;
}



