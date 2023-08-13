import { Component, OnInit, inject } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headerService = inject(HeaderService)


  ngOnInit(): void {
    this.headerService.titulo = "home"
  }



}
