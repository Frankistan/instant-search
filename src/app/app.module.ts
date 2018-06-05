import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomFirebaseModule } from './custom-firebase.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { PostService } from './post.service';

import localeEs from '@angular/common/locales/es';


@NgModule({
    declarations: [
        AppComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        CustomFirebaseModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        PostService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
