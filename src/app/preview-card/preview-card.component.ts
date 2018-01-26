import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-preview-card',
    templateUrl: './preview-card.component.html'
})
export class PreviewCardComponent {
    @Input() image: string;
}
