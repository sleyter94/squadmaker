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
  total: number = 0;
  perPage: number = 20;
  currentPage: number = 1;
  character!: Character
  showDetail: boolean = false;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor => {
      localStorage.setItem('name',valor);
      localStorage.setItem('page', '1');
      this.currentPage = 1;
      this.getCharacters();
    })
    this.loadStatus()
    this.getCharacters();
  }

  loadStatus() {
    if(localStorage.getItem('name')) this.name = localStorage.getItem('name') || '';
    if(localStorage.getItem('gender')) {
      this.genderSelected = localStorage.getItem('gender') as Gender || Gender.All;
    }
    if(localStorage.getItem('page')) {
      this.currentPage = parseInt(localStorage.getItem('page') || '1');
    }
  }

  setGender(gender: Gender) {
    this.genderSelected = gender;
    localStorage.setItem('gender',this.genderSelected);
    this.currentPage = 1
    localStorage.setItem('page', '1')
    this.getCharacters();
  }

  reset() {
    this.genderSelected = Gender.All
    this.name = '';
    localStorage.removeItem('name')
    localStorage.removeItem('gender')
    localStorage.removeItem('page')
    this.getCharacters();
  }

  getCharacters() {
    let filters:CharacterFilter  = {};
    filters.page = this.currentPage;
    if (this.genderSelected != Gender.All) {
      filters.gender = this.genderSelected.toString()
    }
    if (this.name != '') {
      filters.name = this.name;
    }
    this.api.getCharacters(filters)
    .subscribe(response => {
      this.characters = response.results || []
      this.total = response.info?.count || 0;
      console.log(this.characters)
    },
    error => {
      this.characters = [];
    })
  }

  changePage(event:number) {
    this.currentPage = event;
    localStorage.setItem('page', this.currentPage.toString())
    this.getCharacters();
  }

  getCharactersDelay() {
    this.debouncer.next(this.name);
  }

  showCharacter(character: Character) {
    this.character = character;
    this.showDetail = true;
  }

  closeDetail(){
    this.showDetail = false;
    console.log(this.showDetail)
  }
}
