import { Directive, ElementRef } from '@angular/core';
import {  Input ,OnInit} from '@angular/core';
@Directive({
  selector: '[appStatusCode]'
})

export class StatusCodeDirective implements OnInit{

  constructor(private el: ElementRef) {}
  @Input() status: string;
  ngOnInit() {
    switch(this.status){
      case 'Pending':
      this.el.nativeElement.style.color = 'blue';
      break;
      case 'Accepted':
      this.el.nativeElement.style.color = 'green';
      break;
      case 'Rejected':
      this.el.nativeElement.style.color = 'red';
      break;
      case 'Docs Required':
      this.el.nativeElement.style.color = 'orange';
      break;
    }
    
}
}
