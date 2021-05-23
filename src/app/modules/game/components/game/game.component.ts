import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/modules/game/models/item';
import { GameService } from '../../services/gameservice';

const colorMap: {[k: number]: string} = {
  2: '#626567',
  4: '#424949',
  8: '#7E5109',
  16: '#196F3D',
  32: '#138D75',
  64: '#154360',
  128: '#9B59B6',
  256: '#78281F',
  512: '#C0392B',
  1024: '#7D6608',
  2048: '#45B39D'
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  keyEventCodeMap: {[type: string]: string } = {
    ArrowRight: 'right',
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowDown: 'down',
  };

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  getStyles(item: Item) : {[p: string]: string} {
    const top = (12 + (item.row - 1) * 134) + 'px';
    const left =  (12 + (item.col - 1) * 132) + 'px';
    return  {
      top,
      left, 
      'background-color': colorMap[item.value]  || 'black'
    };
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent){
    console.log(event);
    if(this.keyEventCodeMap[event.code]){
      this.gameService[this.keyEventCodeMap[event.code]]();
    }
  }
}
