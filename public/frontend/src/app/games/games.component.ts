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
  imports: [CommonModule, RouterLink
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{
  games: Game[] = [];

  constructor(
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesService.allGames.subscribe(response => {
      this.games = response;
    }, (error) => {
      console.log(error)
    })
  }


}
