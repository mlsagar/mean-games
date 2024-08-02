import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css'
})
export class CreateGameComponent {
  gameForm!: FormGroup;
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private gamesService: GamesService
  ){
    this.gameForm = this.formBuilder.group({
      title: null,
      year: null,
      rate: 1,
      price: null,
      minPlayers: null,
      maxPlayers: null,
      minAge: null,
      designers: null,
    })
  }

  createGame() {
    this.gamesService.addGame(this.gameForm.value).subscribe((response) => {
      this.message = "Added game successfully";
    }, (error) => {
      this.message = error.message;
    })
  }
}
