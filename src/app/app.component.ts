import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of as observableOf, Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap, tap, distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';
import { Post } from './post';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {}
