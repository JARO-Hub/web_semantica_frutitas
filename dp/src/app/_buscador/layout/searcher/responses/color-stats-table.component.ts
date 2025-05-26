import { Component, Input } from '@angular/core';
import { ColorStatsModel } from '../../core/models/color-stats.model';

@Component({
  selector: 'app-color-stats-table',
  standalone: false,
  templateUrl: './color-stats-table.component.html',
})
export class ColorStatsTableComponent {
  @Input() data: ColorStatsModel[] = [];
}
