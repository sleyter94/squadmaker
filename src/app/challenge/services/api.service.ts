import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Character, CharacterFilter, Info } from '../interface/character.interface';
import generateQueryString from '../utils/genereateQueryString';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = `${environment.BASE_URL}`
  constructor(private http: HttpClient) { }

  getCharacters(filters?: CharacterFilter): Observable<Info<Character[]>>{
    const qs = generateQueryString(filters, false)
    return this.http.get<Info<Character[]>>(`${this.baseUrl}/character/${qs}`)
  }

  getCharacter<T extends number | number[]>(id: T): Observable<Info<T extends number ? Character : Character[]>>{
    const qs = generateQueryString(id, true)
    return this.http.get<Info<T extends number ? Character : Character[]>>(`${this.baseUrl}/character/${qs}`)
  }
}
