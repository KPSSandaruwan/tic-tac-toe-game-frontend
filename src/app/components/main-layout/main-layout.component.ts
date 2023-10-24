import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  board: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer: 'X' | 'O' = 'X';
  isGameStarted: boolean = false;
  player: string = "";
  gameId: string = ""
  gameStatus: string = ""

  constructor(private gameService: GameService) {}

  public startGame() {
    this.gameService.startGame().subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        this.isGameStarted = true;
        this.board = res.data.board;
        this.currentPlayer = res.data.currentPlayer;
        this.player = res.data.player;
        this.gameId = res.data._id;
      } else {
        console.log('res', res)
      }
    });
  }

  public resetGame() {

  }



  makeMove(row: number, col: number): void {
    console.log('row', row)
    console.log('col', col)

    if (this.board[row][col] === '') {
      // this.board[row][col] = this.currentPlayer;
      // this.switchPlayer();

      let gameData = {
        gameId: this.gameId,
        row: row,
        col: col,
        currentPlayer: this.currentPlayer
      }

      this.gameService.makeMove(gameData).subscribe((res: any) => {
        console.log('makeMove', res)
        if (res.success) {

          this.board = res.data.board;
          this.currentPlayer = res.data.currentPlayer;
          this.player = res.data.player;
          if (res.data.status === "progress") {

          } else {
            this.gameStatus = res.data.status;
          }
        }
      })
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

}
