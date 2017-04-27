import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  rand(min:number, max:number): number {
    return Math.floor(Math.random() * max) + min;
  }

  /**
  * @Input: Takes in a current running index, and length of a String array,
  * @Output: Returns either ", ", " & ", or "."
  */
  getPostSpacer(index: number, length: number): String {
    var x: String = this.isLastItem(index, length) ? "." : null || this.isSecondLastItem(index, length) ? " & " : null || ", ";
    return x;
  }

  /**
  * @Input: Takes in a current running index, and length of a String array,
  * @Output: Returns true if index is the last item, else false
  */
  isLastItem(index: number, length: number): boolean {
    return index == length - 1;
  }

  /**
  * @Input: Takes in a current running index, and length of a String array,
  * @Output: Returns true if index is the second last item, else false
  */
  isSecondLastItem(index: number, length: number): boolean {
    return index == length - 2;
  }
}
