import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-admin-master',
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './admin-master.component.html',
  styleUrl: './admin-master.component.css'
})
export class AdminMasterComponent {

}
