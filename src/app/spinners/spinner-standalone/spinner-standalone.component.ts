import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-spinner-standalone',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-standalone.component.html',
  styleUrls: ['./spinner-standalone.component.scss']
})
export class SpinnerStandaloneComponent implements OnInit {

  @Input() Wait: boolean = true;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor() { }

  ngOnInit(): void {
  }

  IsWait() {
    return this.Wait = !this.Wait;
  }

}
