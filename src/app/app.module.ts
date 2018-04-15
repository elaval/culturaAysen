import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PopoverModule } from 'ngx-bootstrap';
import { MomentModule } from 'ngx-moment';


import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { CulturaComponent } from './views/cultura/cultura.component';
import { WordCloudComponent } from './views/word-cloud/word-cloud.component';
import { AreaViewComponent } from './views/area-view/area-view.component';
import { SubareaViewComponent } from './views/subarea-view/subarea-view.component';


@NgModule({
  declarations: [
    AppComponent,
    CulturaComponent,
    WordCloudComponent,
    AreaViewComponent,
    SubareaViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    PopoverModule.forRoot()
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
