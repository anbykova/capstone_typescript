import {
  HTTP_CODE,
  HTTP_METHOD,
  USER_ROLE
} from './const';

export interface IHandler<T> {
  next: (value: T) => void;
  error: (error: Error) => void;
  complete: () => void;
}
  
export interface IStatus {
  status: HTTP_CODE;
}
  
export interface IUser {
  name: string;
  age: number;
  roles: USER_ROLE[];
  createdAt: Date;
  isDeleated: boolean;
}

export interface IRequest {
  method: HTTP_METHOD;
  host: string;
  path: string;
  body?: object;
  params: object;
}