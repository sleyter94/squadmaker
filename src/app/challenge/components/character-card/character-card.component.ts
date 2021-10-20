import { Component, Input, OnInit } from '@angular/core';
import { Character, CharacterLocation } from '../../interface/character.interface';
import { Gender } from '../../interface/gender.interface';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() character: Character = {
    status: 'unknown',
    species: '',
    type: '',
    gender: Gender.Unknown,
    origin: {} as CharacterLocation,
    location: {} as CharacterLocation,
    image: '',
    episode: []
  } as unknown as Character;
  constructor() { }

  ngOnInit(): void {
  }

}
