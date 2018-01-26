import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {GoogleImageSearchService} from '../google-image-search/google-image-search.service';
import {GoogleImageSearchResultInterface} from '../google-image-search/google-image-search-result.interface';
import {GameService} from '../game/game.service';
import {CardInterface} from '../game/card.interface';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    public results: Observable<string[]>;

    private queries: Subject<string> = new Subject<string>();

    public preview: CardInterface[];

    public loading = false;

    public size = 12;

    public constructor(
        private imageSearch: GoogleImageSearchService,
        private game: GameService
    ) {
        this.preview = this.game.cards;
    }

    public ngOnInit(): void {
        this.results = this.queries.pipe(
            tap(() => {
                this.loading = true;
            }),

            debounceTime(300),

            distinctUntilChanged(),

            switchMap((query: string) => {
                return this.imageSearch.search(query);
            }),

            map((result: GoogleImageSearchResultInterface): string[] => {
                return result.data.map((image: string): string => {
                    return image;
                });
            }),

            tap(() => {
                this.loading = false;
            })
        );
    }

    public search(query: string) {
        this.queries.next(query);
    }

    public toggleImage(image: string): void {
        if (this.game.hasImage(image)) {
            this.game.removeCard(image);
        } else {
            this.game.addCard(image);
        }
    }

    public isSelectedImage(image: string): boolean {
        return this.game.hasImage(image);
    }
}
