import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { PostService } from '../post.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    posts$: Observable<any[]>;
    startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
    searchForm: FormGroup;
    searchInput: FormControl;

    constructor(
        private postService: PostService,
        private fb: FormBuilder,
    ) {
        this.searchForm = this.fb.group({
            searchInput: ['', Validators.minLength(3)]
        });
    }

    ngOnInit() {
        this.posts$ = this.postService.search(this.startAt);

        this.searchForm.get('searchInput').valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map((term: string) => {
                term = term.trim().toUpperCase();
                if (!term )  this.startAt.next('');
                if (term.length < 4) return ;
                this.startAt.next(term);
            })
        ).subscribe();
    }
}
