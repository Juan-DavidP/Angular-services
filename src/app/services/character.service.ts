import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Character } from '../models';
import { characterAdapter } from '../adapters';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  // private apiUrl = 'https://api.example.com/characters';
  // private http = inject(HttpClient);

  // getCharacters(): Observable<Character[]> {
  //   return this.http.get<Character[]>(this.apiUrl);
  // }

  // getCharacters(): Observable<Character[]> {
  //   return this.http.get<Character[]>(this.apiUrl).pipe(
  //     map((characters) => characterAdapter(characters))
  //   );
  // }

  // updateCharacter(character: Character): Observable<Character> {
  //   // return this.http.put<Character>(`${this.apiUrl}/${character.id}`)
  //   return this.http.put<Character>(`${this.apiUrl}`, character);
  // }

  // deleteCharacter(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
  // constructor() { }

  /* arquitectura  Single of truth architecture */
  state = signal({
    characters: new Map<number, Character>(),
  })

  constructor(){
    this.getCharacters();
  }

  getFormattedCharacters() {
    return Array.from(this.state().characters.values())
  }

  getCharacters(): void {
    const mockCharacter: Character[] = [
      { id: 1, name: "Juan", lastName: "David", age: 626 },
      { id: 2, name: "Juan", lastName: "David", age: 626 },
      { id: 3, name: "Juan", lastName: "David", age: 626 },
      { id: 4, name: "Juan", lastName: "David", age: 626 }
    ]

    of(mockCharacter).subscribe(result => {
      result.forEach(character => this.state().characters.set(character.id, character));
      this.state.set({ characters: this.state().characters });
    })
  }

  updateCharacter(character: Character): void {
    const updateCharacter = { ...character };
    of(updateCharacter).subscribe((result) => {
      this.state.update((state) => {
        state.characters.set(result.id, result);
        return { characters: state.characters }
      })
    })
  }

  deleteCharacter(id: number): void {
    of({ status: 200 }).subscribe(() => {
      this.state.update((state) => {
        state.characters.delete(id)
        return { characters: state.characters }
      })
    })
  }
}
