import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase)
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ]
})
export class CustomFirebaseModule { }
