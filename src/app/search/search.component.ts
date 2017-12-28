import {Component, OnInit} from '@angular/core';
import {SearchResultModel} from './search-result.model';
import {GoogleImageSearchService} from '../google-image-search/google-image-search.service';
import {SearchResultInterface} from '../google-image-search/search-result.interface';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    public results: Observable<SearchResultModel[]>;

    private queries: Subject<string> = new Subject<string>();

    public constructor(
        private imageSearch: GoogleImageSearchService
    ) {
    }

    public ngOnInit(): void {
        this.results = this.queries.pipe(
            debounceTime(300),

            distinctUntilChanged(),

            switchMap((query: string) => {
                return this.imageSearch.search(query);
            }),

            map((result: SearchResultInterface): SearchResultModel[] => {
                return result.data.map((image: string): SearchResultModel => {
                    return {
                        image
                    };
                });
            })
        );
    }

    public search(query: string) {
        this.queries.next(query);
    }
}
