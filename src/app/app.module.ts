import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {ConfigComponent} from './config/config.component';
import {GameComponent} from './game/game.component';
import {SearchComponent} from './search/search.component';
import {googleImageSearchInjectables} from './google-image-search/google-image-search.injectables';
import {GoogleImageSearchService} from './google-image-search/google-image-search.service';


@NgModule({
    declarations: [
        AppComponent,
        ConfigComponent,
        GameComponent,
        HomeComponent,
        SearchComponent
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
        GoogleImageSearchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
