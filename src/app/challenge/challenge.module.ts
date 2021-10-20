import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    PaginationComponent,
    CharacterDetailComponent,
    CharacterCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports:[
    HomeComponent,
    SearchComponent,
  ]
})
export class ChallengeModule { }
