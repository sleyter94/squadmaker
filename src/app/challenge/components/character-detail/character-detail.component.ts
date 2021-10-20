import { Component, OnInit, Input } from '@angular/core';
import { Character, Episode, EpisodeFilter, CharacterLocation } from '../../interface/character.interface';
import { ApiService } from '../../services/api.service';
import { Gender } from '../../interface/gender.interface';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  constructor(private api: ApiService) { }

  episodes: Episode[] = []
  characters: Character[] = []

  ngOnInit(): void {
    let filters: EpisodeFilter = {};
    filters.page = 1;
    this.api.getEpisodes(filters)
    .subscribe(response => {
      this.episodes = this.episodes.concat(response.results || [])
      let pages = response.info?.pages || 1;
      for(let i = 2; i<=pages; i++) {
        filters.page = i;
        this.api.getEpisodes(filters)
        .subscribe(response => {
          this.episodes = this.episodes.concat(response.results || [])
        })
      }
    })
    this.getRandomCharacters();
  }

  @Input("character") character: Character = {
    status: 'unknown',
    species: '',
    type: '',
    gender: Gender.Unknown,
    origin: {} as CharacterLocation,
    location: {} as CharacterLocation,
    image: '',
    episode: []
  } as unknown as Character;;

  getEpisodes() :Episode[] {
    let episodeIds = this.character.episode.map(url => {
      let parts = url.split('/')
      return parseInt(parts[parts.length-1]);
    })
    return this.episodes.filter( epi => episodeIds.includes(epi.id))
  }

  getRandomCharacters(){
    let ids = [
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1
    ]
    this.api.getCharacter(ids).subscribe(
      response => {
        this.characters = response || []
        console.log(response)
      }
    )
  }

}
