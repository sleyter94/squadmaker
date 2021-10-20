import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interface/character.interface';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() character!: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
