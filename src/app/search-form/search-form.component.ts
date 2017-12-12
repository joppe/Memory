import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
    form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            query: []
        });
    }

    onSubmit(value: any): void {
        console.log(value);
    }
}
