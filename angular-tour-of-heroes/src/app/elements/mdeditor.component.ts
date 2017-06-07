// Angular Imports
import { Component, ElementRef, ViewChild } from '@angular/core';

// Declare Global Variable
var SimpleMDE : any = require('simplemde');

// Define Editor Component
@Component({
  selector: 'mdeditor',
  templateUrl: './mdeditor.component.html',
})

// Export Editor Class
export class MdEditorComponent {
  
  @ViewChild('simplemde') textarea : ElementRef;
  mde: any;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      placeholder:``,
    });
    this.insertTemplate();
  }

  submit() {
    console.log(this.mde.value());
  }

  insertTemplate() {
    const templateNote: String = `*Brief*: {Enter a brief description of the note ...}

*Actions Required*:
**User 1**: {Some action required}
**User 2**: {Some action required}
...`
    let currentVal = this.mde.value().trim();
    let output = currentVal ? (currentVal === templateNote || !currentVal.indexOf(templateNote) ? this.mde.value() : currentVal + "\n\n" + templateNote ) : templateNote;
    this.mde.value(output);
  }
}
  