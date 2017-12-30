import {Injectable} from '@angular/core';
import {CardInterface} from './card.interface';

@Injectable()
export class GameService {
    public cards: CardInterface[] = [];

    public constructor() {}

    public addCard(image: string): void {
        this.cards.push({
            image,
            found: false,
            turns: 0
        });
    }

    public removeCard(image: string): void {
        this.cards.splice(this.getIndex(image), 1);
    }

    public hasImage(image: string): boolean {
        return this.getIndex(image) > -1;
    }

    private getIndex(image): number {
        return this.cards.findIndex((card: CardInterface): boolean => {
            return card.image === image;
        });
    }
}
