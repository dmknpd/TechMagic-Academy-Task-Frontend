import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatIconModule, RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  @Input() isOpen = true;

  private auth = inject(AuthService);
  private router = inject(Router);

  userEmail = this.auth.getUserEmail();
  userRole = this.auth.getUserRole();

  onLogout() {
    this.auth.logout().subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
}
