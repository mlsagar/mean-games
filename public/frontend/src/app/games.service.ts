import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  base_url = "http://localhost:3000/api";

  constructor(
    private http: HttpClient
  ) { }

  get allGames():Observable<Game[]> {
    return this.http.get<Game[]>(this.base_url + "/games");
  }

  addGame(request: Game) {
    return this.http.post(this.base_url + "/games", request);
  }

  getOneGame(gameId: string):Observable<Game> {
    return this.http.get<Game>(this.base_url + "/games/" + gameId);
  }

  deleteGame(gameId: string) {
    return this.http.delete(this.base_url + "/games/" + gameId);
  }
}
