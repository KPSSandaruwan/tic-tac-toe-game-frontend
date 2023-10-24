import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    });
  }

  public resetGame() {
    let gameData = {
      gameId: this.gameId
    }
    this.gameService.resetGame(gameData).subscribe((res: any) => {
      if (res.success) {
        this.board = res.data.board;
        this.currentPlayer = res.data.currentPlayer;
        this.player = res.data.player;
      }
    })
  }

  public makeMove(row: number, col: number): void {
    if (this.board[row][col] === '') {
      let gameData = {
        gameId: this.gameId,
        row: row,
        col: col,
        currentPlayer: this.currentPlayer
      }

      this.gameService.makeMove(gameData).subscribe((res: any) => {
        if (res.success) {
          this.board = res.data.board;
          this.currentPlayer = res.data.currentPlayer;
          this.player = res.data.player;
          if (res.data.status === "progress") {

          } else {
            this.gameStatus = res.data.status;
            let message: string = ""
            if (res.data.status === "Won") {
              this.gameStatus = "Won"
              message = "You won the match, Congratulations!!!"
            } else if (res.data.status === "loose") {
              this.gameStatus = "Loose";
              message = "You loose the match, Try again!!!"
            } else if (res.data.status === "draw") {
              this.gameStatus = "Draw";
              message = "Match draw, Try again!!!"
            }
            Swal.fire(this.gameStatus, message, 'success').then(r => {
              this.startGame()
            });
          }
        }
      })
    }
  }

}
