import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  standalone: true,
  selector: 'app-loading-screen',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})

export class LoadingScreenComponent {
  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading$.subscribe(
      (loading) => (this.isLoading = loading)
    );
  }
}
