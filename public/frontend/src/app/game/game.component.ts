import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarsRatingComponent } from '../stars-rating/stars-rating.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, StarsRatingComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  game!: Game;
  gameId!: string;

  constructor(
    private gamesService: GamesService,
    private _activatedRoute: ActivatedRoute
  ) { 
    this.game = new Game("", "", 0);
    this.gameId = this._activatedRoute.snapshot.params["gameId"];
  }

  ngOnInit(): void {
    this.gamesService.getOneGame(this.gameId).subscribe(game => {
      this.game = game;
    })
  }
}
