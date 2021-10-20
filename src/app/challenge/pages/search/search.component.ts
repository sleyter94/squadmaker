import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Character, CharacterFilter } from '../../interface/character.interface';
import { Gender } from '../../interface/gender.interface';
import { ApiService } from '../../services/api.service';
import { debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  genders = Gender;
  genderSelected = Gender.All;
  favorite: boolean = false;
  characters: Character[] = []
  name: string = '';
  debouncer: Subject<string> = new Subject();
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor => {
      this.getCharacters();
    })
    this.getCharacters();
  }

  setGender(gender: Gender) {
    this.genderSelected = gender;
    this.getCharacters();
  }

  reset() {
    this.genderSelected = Gender.All
    this.name = '';
    this.getCharacters();
  }

  getCharacters() {
    let filters:CharacterFilter  = {};
    if (this.genderSelected != Gender.All) {
      filters.gender = this.genderSelected.toString()
    }
    if (this.name != '') {
      filters.name = this.name;
    }
    this.api.getCharacters(filters)
    .subscribe(response => {
      this.characters = response.results || []
      console.log(this.characters)
    },
    error => {
      this.characters = [];
    })
  }

  getCharactersDelay() {
    this.debouncer.next(this.name);
  }

}
