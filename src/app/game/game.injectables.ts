import {Provider} from '@angular/core';
import {GameService} from './game.service';

export const gameInjectables: Provider[] = [
    {
        provide: GameService,
        useClass: GameService
    }
];
