import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError('getHeroes', [])))
  }

  getHero(id: number): Observable<Hero> {
    const heroIdUrl = `${this.heroesUrl}/${id}`;
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return this.httpClient.get<Hero>(heroIdUrl).pipe(catchError(this.handleError(`getHeroes id = ${id}`)))
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(catchError(this.handleError('updateHero')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`HeroService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
