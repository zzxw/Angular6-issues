import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule, Http} from '@angular/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { CodeIssuesComponent } from './code-issues/code-issues.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { IssuesComponent } from './issues/issues.component';
import { IssuesTabComponent } from './issues-tab/issues-tab.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TrendComponent } from './trend/trend.component';
import { TypesComponent } from './types/types.component';
import { VersionComponent } from './version/version.component';
import {RouterModule} from '@angular/router';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    CodeIssuesComponent,
    HelpComponent,
    HomeComponent,
    IssuesComponent,
    IssuesTabComponent,
    MailListComponent,
    StatisticsComponent,
    TopBarComponent,
    TrendComponent,
    TypesComponent,
    VersionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    HttpModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'issue-mail',
          component: MailListComponent
        },
        {
          path: 'issue-category',
          component: CodeIssuesComponent
        },
        {
          path: 'issue-trace',
          component: IssuesComponent
        },
        {
          path: 'issue-version',
          component: VersionComponent
        },
        {
          path: 'count-trend',
          component: TrendComponent
        },
        {
          path: 'count-projects',
          component: StatisticsComponent
        },
        {
          path: 'count-types',
          component: TypesComponent
        },
        {
          path: 'issue-help',
          component: HelpComponent
        }
      ]
    )
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
