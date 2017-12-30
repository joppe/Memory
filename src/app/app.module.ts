import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import {SearchComponent} from './search/search.component';
import {googleImageSearchInjectables} from './google-image-search/google-image-search.injectables';
import {gameInjectables} from './game/game.injectables';
import { SearchResultComponent } from './search-result/search-result.component';
import {PreviewCardComponent} from './preview-card/preview-card.component';


@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        HomeComponent,
        PreviewCardComponent,
        SearchComponent,
        SearchResultComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        googleImageSearchInjectables,
        gameInjectables
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
