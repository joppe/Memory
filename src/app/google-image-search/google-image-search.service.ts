import 'rxjs/add/operator/map';
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {SEARCH_QUERY_PLACEHOLDER, SEARCH_URL} from './google-image-seach.config';
import {SearchResultInterface} from './search-result.interface';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GoogleImageSearchService {
    public constructor(
        private http: HttpClient,
        @Inject(SEARCH_URL) private url: string,
        @Inject(SEARCH_QUERY_PLACEHOLDER) private queryPlaceholder: string
    ) {
    }

    public search(query: string): Observable<SearchResultInterface> {
        const queryUrl: string = this.url.replace(this.queryPlaceholder, query);

        return this.http.get<SearchResultInterface>(queryUrl, httpOptions).pipe(
            catchError(this.handleError(
                'search',
                {
                    data: [],
                    status: 500,
                    message: 'error'
                }
            ))
        );
    }

    private handleError(operation: string, result: SearchResultInterface) {
        return (error: HttpErrorResponse): Observable<SearchResultInterface> => {
            console.log(operation, error);

            result.message = `operation: ${operation}, message: ${error.message}`;

            return of(result);
        };
    }
}
