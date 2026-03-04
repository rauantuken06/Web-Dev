import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = true;
  error: string | null = null;

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load albums';
        this.loading = false;
      },
    });
  }

  trackById(_index: number, a: Album) {
    return a.id;
  }

  openAlbum(id: number): void {
    this.router.navigate(['/albums', id]);
  }

  deleteAlbum(id: number, event: MouseEvent): void {
    event.stopPropagation();

    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter(a => a.id !== id);
      },
      error: () => {
        this.error = 'Failed to delete album';
      },
    });
  }
}