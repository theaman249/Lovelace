import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCountUp]'  // Ensure this matches what you use in the template
})
export class CountUpDirective implements OnInit {
  @Input('startVal') startVal: number = 0;
  @Input('endVal') endVal: number = 100;
  @Input('duration') duration: number = 2; // in seconds

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startCountUp();
  }

  private startCountUp() {
    const element = this.el.nativeElement;
    const range = this.endVal - this.startVal;
    const stepTime = Math.abs(Math.floor((this.duration * 1000) / range));
    let currentVal = this.startVal;

    const increment = this.endVal > this.startVal ? 1 : -1;
    const timer = setInterval(() => {
      currentVal += increment;
      element.innerText = currentVal.toString();  // Ensure the value is converted to string

      if (currentVal === this.endVal) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
