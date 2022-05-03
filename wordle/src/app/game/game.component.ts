import { Component, OnInit } from '@angular/core';
import { PreviousGuess } from '../previous-guess';
import { GuessService } from '../guess.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  guess:string;
  answer:string;
  won:boolean;
  showAlert:boolean;
  inputEntered:boolean;
  guesses:Array<PreviousGuess>;

  constructor(
    private guessService:GuessService
  ) { 
    this.guess = "";
    this.won = false;
    this.showAlert = false;
    this.inputEntered = false;
    this.guesses = [];
    this.answer="test";
    this.guessService.sendQuery().subscribe(
      (respData) => { 
        // do something
        this.answer = respData.word;
      }
    );
  }

  replay(){
    this.guess = "";
    this.guessService.sendQuery().subscribe(
      (respData) => { 
        // do something
        this.answer = respData.word;
      }
    );
    this.won = false;
    this.inputEntered = false;
    this.showAlert = false;
    this.guesses = [];
  }

  checkWord(){
    this.guess = this.guess.toLowerCase();
    this.won = this.guess === this.answer;
    this.showAlert = true;
    this.inputEntered = false;
    const prevGuess = new PreviousGuess(
      this.guess, 
      this.countCharsInWord(), 
      this.countCharsInRightPos(), 
      this.checkLength());
    this.guesses.unshift(prevGuess);
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }

  countCharsInWord(){
    const count1 = new Map();
    for (const c of this.guess){
      if(!count1.has(c)){
        count1.set(c, 1);
      }
      else{
        count1.set(c, count1.get(c)+1);
      }
    }

    const count2 = new Map();
    for (const c of this.answer){
      if(!count2.has(c)){
        count2.set(c, 1);
      }
      else{
        count2.set(c, count2.get(c)+1);
      }
    }

    var res:number = 0;
    for (const c of count1.keys()){
      if(count2.has(c)){
        res += Math.min(count1.get(c), count2.get(c));
      }
    }
    return res;
  }
  countCharsInRightPos(){
    var numChars:number = 0;
    var shortestLength:number = (this.guess.length < this.answer.length ? this.guess.length : this.answer.length);
    for(var i = 0; i < shortestLength; i++){
      if(this.guess[i] == this.answer[i]){
        numChars++;
      }
    }
    return numChars;
  }
  checkLength(){
    return this.guess.length - this.answer.length;
  }

  ngOnInit(): void {
  }

}
