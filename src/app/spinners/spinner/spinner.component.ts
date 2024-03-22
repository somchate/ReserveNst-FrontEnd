import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

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
