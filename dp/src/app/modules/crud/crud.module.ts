import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, DataTablesModule,
    SweetAlert2Module.forChild(),
    NgbModalModule,
    CrudComponent
  ],
  exports: [CrudComponent]
})
export class CrudModule { }
