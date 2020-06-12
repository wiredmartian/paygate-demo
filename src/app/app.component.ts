import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'paygate-demo';

    constructor(private activatedRoute: ActivatedRoute) {

    }
  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data);
    console.log(this.activatedRoute.snapshot.paramMap);
  }
}
