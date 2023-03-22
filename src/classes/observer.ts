import { IHandler } from '../interfaces';

type UnsubscribeFunction = () => void;

export class Observer<T> {
  private isUnsubscribed: boolean;
  public _unsubscribe?: UnsubscribeFunction;

  constructor(private handlers: IHandler<T>) {
    this.handlers = handlers;
    this.isUnsubscribed = false;
  }

  next(value: T): void {
    if (this.handlers.next && !this.isUnsubscribed) {
      this.handlers.next(value);
    }
  }

  error(error: Error): void {
    if (!this.isUnsubscribed) {
      if (this.handlers.error) {
        this.handlers.error(error);
      }

      this.unsubscribe();
    }
  }

  complete(): void {
    if (!this.isUnsubscribed) {
      if (this.handlers.complete) {
        this.handlers.complete();
      }

      this.unsubscribe();
    }
  }

  unsubscribe(): void {
    this.isUnsubscribed = true;

    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}