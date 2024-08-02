import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "games",
        component: GamesComponent
    },
    {
        path: "game/:gameId",
        component: GameComponent
    },
    {
        path: "create-game",
        component: CreateGameComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }

];
