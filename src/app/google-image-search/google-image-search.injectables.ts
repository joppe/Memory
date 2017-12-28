import {Provider} from '@angular/core';
import {SEARCH_QUERY_PLACEHOLDER, SEARCH_URL} from './google-image-seach.config';
import {GoogleImageSearchService} from './google-image-search.service';

export const googleImageSearchInjectables: Provider[] = [
    {
        provide: SEARCH_URL,
        useValue: SEARCH_URL
    },
    {
        provide: SEARCH_QUERY_PLACEHOLDER,
        useValue: SEARCH_QUERY_PLACEHOLDER
    },
    {
        provide: GoogleImageSearchService,
        useClass: GoogleImageSearchService
    }
];
