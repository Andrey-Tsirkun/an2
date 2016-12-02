import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './scss/main.scss';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module'

platformBrowserDynamic().bootstrapModule(AppModule);