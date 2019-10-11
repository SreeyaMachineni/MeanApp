import { Directive, ElementRef } from '@angular/core';
import {  Input ,OnInit} from '@angular/core';
@Directive({
  selector: '[appNotification]'
})
export class NotificationDirective {

  constructor(private el: ElementRef) {}
  @Input() verified: string;
  ngOnInit() {
    if(this.verified){
      this.el.nativeElement.style.color = 'purple';
    }else{
      this.el.nativeElement.style.color = 'blue';

    }
}

}
