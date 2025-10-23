import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  roles = ['Software Engineer', 'AI Engineer'];
  currentRole = this.roles[0];
  private index = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only run in the browser
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.index = (this.index + 1) % this.roles.length;
        this.currentRole = this.roles[this.index];
      }, 3000);
    }
  }
}
