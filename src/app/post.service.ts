import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Post } from './post';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class PostService {
    constructor(private afs: AngularFirestore) { }
    search(start: BehaviorSubject<string>): Observable<any[]> {
        return start.pipe(
            switchMap(startText => {
                const endText = startText + '\uf8ff';
                if (!startText) {
                    return this.afs.collection<Post>('posts', ref => ref
                        .orderBy('createdAt', 'desc')
                        .limit(10))
                        .snapshotChanges().pipe(
                            map(changes => {
                                return changes.map(c => {
                                    return { id: c.payload.doc.id, ...c.payload.doc.data() };
                                });
                            })
                        );
                }
                return this.afs.collection<Post>('posts', ref => ref
                    .orderBy('title', 'asc')
                    .orderBy('createdAt', 'desc')
                    .limit(10)
                    .startAt(startText)
                    .endAt(endText))
                    .snapshotChanges().pipe(
                        // debounceTime(200),
                        // distinctUntilChanged(),
                        map(changes => {
                            return changes.map(c => {
                                return { id: c.payload.doc.id, ...c.payload.doc.data() };
                            });
                        })
                    );
            })
        );

    }

    list(): Observable<any[]> {
        return this.afs.collection<Post>('posts', ref => ref
            .orderBy('title', 'asc')
            .orderBy('createdAt', 'asc')
            .limit(10))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(c => {
                        return { id: c.payload.doc.id, ...c.payload.doc.data() };
                    });
                })
            );
    }
}
