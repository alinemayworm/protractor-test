import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from './app.constants';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  baseUrl = AppConstants.baseUrl;
  color = '#0000FF';

  constructor(private http: HttpClient) {
    this.getUserTitle();
  }

  private getUserTitle() {
    this.http.get(AppConstants.baseUrl + '/lang', {

      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'no-cors'
      }

    }).subscribe((data: any) => {
      console.log(AppConstants.baseUrl);
      this.title = data.title;
    });

    // from(
    //   fetch(
    //     AppConstants.baseUrl + '/lang', // the url you are trying to access
    //     {
    //       headers: {
    //         'Access-Control-Allow-Origin': '*'
    //       },
    //       method: 'GET', // GET, POST, PUT, DELETE
    //       mode: 'no-cors' // the most important option
    //     }
    //   )).subscribe((data: any) => {
    //     console.log('data is ', data);
    //     this.title = data.title;
    //   });
  }


  public changeColor() {
    if (this.color === '#0000FF') {
      this.color = '#FF00FF';
      return;
    }
    this.color = '#0000FF';
  }
}
