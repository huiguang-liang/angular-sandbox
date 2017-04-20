import { Injectable } from '@angular/core';

@Injectable()
export class Helper {
  rand(min:number, max:number) {
    return Math.floor(Math.random() * max) + min;
  }
}
