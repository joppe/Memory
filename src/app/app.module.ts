import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {ConfigComponent} from './config/config.component';
import {GameComponent} from './game/game.component';


@NgModule({
    declarations: [
        AppComponent,
        ConfigComponent,
        GameComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
