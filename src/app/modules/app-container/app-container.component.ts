import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { MoviesService } from '@app/services/movies.service';
import { FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/common/modal/modal.component';

@Component({
  selector: 'movies-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit, OnDestroy {

  private _currUrl: string = 'https://demo.credy.in/api/v1/maya/movies/';

  private _avatarBaseURL: string = 'https://ui-avatars.com/api/';

  private _destroy$: Subject<any> = new Subject<any>();

  private _masterResult: Array<any> = []

  listInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  searchControl: FormControl = new FormControl('');

  selectedMovie: any = null;

  loading: boolean = false;

  fetchFailed: boolean = false;
  
  @ViewChild('moviesModal') moviesModal: ModalComponent;

  constructor( private _movieService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies(this._currUrl);
    this._initSearchSubsciption();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initSearchSubsciption(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(250),
      filter(_ => (_.length > 3 || _.length === 0)),
      takeUntil(this._destroy$),
    )
    .subscribe((_: string) => {
      const filteredResult = this._masterResult.filter(result => result.title.toLowerCase().includes(_.toLowerCase()));
      this.listInfo$.next({ ...this.listInfo$.getValue(), results: filteredResult });
    })
  }

  getMovies(url: string): void {
    this.loading = true;
    this._currUrl = url;
    this._movieService.getMoviesList(url)
      .pipe(
        map(movies => {
          const results = movies.results.map( _ => {
            const avName = _.title.replace(/\W/,'+');
            return { 
            ..._, imgUrl: `${this._avatarBaseURL}?name=${avName}&background=random`
            }
          });
          return { ...movies, results }
        })
      )
      .subscribe(
        _ => {
        this._masterResult = _.results;
        this.listInfo$.next(_);
        this.loading = false;
        this.fetchFailed = false;
        },
        err => {
          this.loading = false;
          this.fetchFailed = true;
        }
      );
  }

  openMoviesModal(movie: any): void {
    this.selectedMovie = movie;
    setTimeout(() => {
      this.moviesModal.openModal();
    },0);
    // this
  }

  _modalClosed(): void {
    this.selectedMovie = null;
  }

  reFetch() {
    this.getMovies(this._currUrl);
  }

}
