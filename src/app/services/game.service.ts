import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Util } from '../common/util';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public startGame() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = Util.apiAuthUrl(`start-game`)
    return this.http.post(url, {username: username}, { headers })
  }

  public makeMove(gameData: {gameId: string, row: number, col: number, currentPlayer: string}) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = Util.apiAuthUrl(`play-turn`)
    return this.http.post(url, gameData, { headers })
  }
}
