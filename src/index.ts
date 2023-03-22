import {
  IUser,
  IRequest,
  IStatus
} from './interfaces';
import {
  HTTP_CODE,
  HTTP_METHOD,
  USER_ROLE
} from './const';
import { Observable } from './classes/observable';

const userMock: IUser = {
  name: 'User Name',
  age: 26,
  roles: [
    USER_ROLE.USER,
    USER_ROLE.ADMIN
  ],
  createdAt: new Date(),
  isDeleated: false,
};

const requestsMock: IRequest[] = [
  {
    method: HTTP_METHOD.POST,
    host: 'service.example',
    path: 'user',
    body: userMock,
    params: {},
  },
  {
    method: HTTP_METHOD.GET,
    host: 'service.example',
    path: 'user',
    params: {
      id: '3f5h67s4s'
    },
  }
];

const handleRequest: (request: object) => IStatus = (request: object) => {
  // handling of request
  return { status: HTTP_CODE.OK };
};
const handleError: (error: Error) => IStatus = (error: Error) => {
  // handling of error
  return { status: HTTP_CODE.SERVER_ERROR };
};

const handleComplete = () => console.log('complete');

const requests$ = Observable.from<IRequest>(requestsMock);

const subscription = requests$.subscribe({
  next: handleRequest,
  error: handleError,
  complete: handleComplete
});

subscription.unsubscribe();