import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FrutaModel } from "../../core/models/fruta.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-results-table',
  standalone: false,
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.scss'
})
export class ResultadosComponent implements OnChanges {
  @Input() lang: 'es'|'en' = 'es';
  @Input() frutas: FrutaModel[] = [];
  display: Array<{ label: string, value: string }> = [];
  @Input() data: FrutaModel[] = [];

  displayedColumns = ['nombre','vitC','orac','abstract','thumb'];
  dataSource       = new MatTableDataSource<FrutaModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges() {
    this.dataSource.data = this.data;
    if (this.paginator) { this.dataSource.paginator = this.paginator; }
  }

  expandedItems: Set<number> = new Set();

  isExpanded(index: number): boolean {
    return this.expandedItems.has(index);
  }

  toggleExpand(index: number): void {
    if (this.expandedItems.has(index)) {
      this.expandedItems.delete(index);
    } else {
      this.expandedItems.add(index);
    }
  }

}
