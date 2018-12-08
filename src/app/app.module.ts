import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WebStorageModule} from 'ngx-store';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatMenuModule
} from '@angular/material';
import {QuizGroupService} from './services/quiz-group.service';
import {SettingsDialogComponent} from './components/home/settings-dialog/settings-dialog.component';
import {GroupsDialogComponent} from './components/home/groups-dialog/groups-dialog.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SettingsDialogComponent,
    GroupsDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    WebStorageModule,

    // Angular Material Design
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SettingsDialogComponent,
    GroupsDialogComponent
  ],
  providers: [
    ElectronService,
    QuizGroupService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
