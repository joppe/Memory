import 'rxjs/add/operator/map';
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {SEARCH_QUERY_PLACEHOLDER, SEARCH_URL} from './google-image-seach.config';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {GoogleImageSearchResultInterface} from './google-image-search-result.interface';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class GoogleImageSearchService {
    public constructor(
        private http: HttpClient,
        @Inject(SEARCH_URL) private url: string,
        @Inject(SEARCH_QUERY_PLACEHOLDER) private queryPlaceholder: string
    ) {
    }

    public search(query: string): Observable<GoogleImageSearchResultInterface> {
        const queryUrl: string = this.url.replace(this.queryPlaceholder, query);

        return this.http.get<GoogleImageSearchResultInterface>(queryUrl, httpOptions).pipe(
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

    private handleError(operation: string, result: GoogleImageSearchResultInterface) {
        return (error: HttpErrorResponse): Observable<GoogleImageSearchResultInterface> => {
            console.log(operation, error);

            result.message = `operation: ${operation}, message: ${error.message}`;

            return of(result);
        };
    }
}
