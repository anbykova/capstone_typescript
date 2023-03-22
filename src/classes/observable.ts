import { Observer } from './observer';
import { IHandler } from '../interfaces';

type UnsubscribeFunction = () => void;

export class Observable<T> {
  constructor(private _subscribe: (observer: Observer<T>) => UnsubscribeFunction) {
  }

  static from<U>(values: U[]): Observable<U> {
    return new Observable((observer: Observer<U>): UnsubscribeFunction => {
      values.forEach((value) => observer.next(value));

      observer.complete();

      return () => {
        console.log('unsubscribed');
      };
    });
  }

  subscribe(obs: IHandler<T>): { unsubscribe: () => void } {
    const observer = new Observer(obs);

    observer._unsubscribe = this._subscribe(observer);

    return ({
      unsubscribe() {
        observer.unsubscribe();
      }
    });
  }
}