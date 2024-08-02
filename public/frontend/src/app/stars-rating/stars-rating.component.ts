import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'stars-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars-rating.component.html',
  styleUrl: './stars-rating.component.css'
})
export class StarsRatingComponent {
  stars:number[] = [];
  _rate: number = 0

  @Input()
  set rate(rate: number) {
    this._rate = rate;
    this.stars = new Array(rate);
  }
}
