import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFormComponent } from './upload-form/upload-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  entryComponents:[UploadFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
