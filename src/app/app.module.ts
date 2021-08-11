import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider } from '@angular/core';
import { AuthGuard } from './shared/guards/auth.guard';
const HTTP_AUTH_GUARD: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthGuard,
  multi: true,
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
  ],
  providers: [HTTP_AUTH_GUARD],
  bootstrap: [AppComponent],
})
export class AppModule {}
