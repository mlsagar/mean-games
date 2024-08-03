import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }
  get year() { return this.#year; }
  get rate() { return this.#rate; }
  get price() { return this.#price; }
  set price(price: number) { this.#price = price; }
  get minPlayers() { return this.#minPlayers; }
  get maxPlayers() { return this.#maxPlayers; }
  get minAge() { return this.#minAge; }
  constructor(id: string, title: string, price: number) {
    this.#_id = id;
    this.#title = title;
    this.#price = price;
  }
}


@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{
  games: Game[] = [];
  count = 5;
  offset = 0;

  countOptions: number[] = [];
  totalPageNumber!: number;

  constructor(
    private gamesService: GamesService
  ) {
    for(let i =0; i < 10; i++) {
      this.countOptions[i] = i + 1;
    }
    
  }

  ngOnInit(): void {
    this._getAllGames(this.count, this.offset);
  }

  changeCount(event:Event) {
   this.count = Number((event.target as HTMLInputElement).value);
    this.offset = 0;
    this.counter = 0;
    this._getAllGames(this.count, this.offset);
  }

  _getAllGames(count:number, offset: number) {
    this.gamesService.allGames(count, offset).subscribe(response => {
      this.games = response;
    }, (error) => {
      console.log(error)
    })
  }

  // paginate(offsetValue: number) {
  //   this.offset = (offsetValue - 1) * this.count;
  //   this._getAllGames(this.count, this.offset);
  // }

  counter = 0;

  nextPage() {
    if(!this.games.length) {
      alert("Maximum point reached");
      return;
    }
    this.counter++;
    console.log(this.counter);
    this.offset =this.counter * this.count;
    this._getAllGames(this.count, this.offset);
  }

  previousPage() {
    if(this.counter === 0) {
      alert("cannot go to previous");
      return
    }
    this.counter--;
    this.offset = this.counter * this.count;
    this._getAllGames(this.count, this.offset);
  }


}
