import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { OverviewComponent } from './overview/overview.component';
import { ProjectsComponent } from './projects/projects.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ConnectionsComponent } from './connections/connections.component';
import {
  CardsModule,
  DropdownMenusModule,
  WidgetsModule,
} from '../../_buscador/partials';
import { SharedModule } from "../../_buscador/shared/shared.module";

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    ProfileComponent,
    WidgetsModule,
    CardsModule,
    SharedModule,
    OverviewComponent,
    ProjectsComponent,
    CampaignsComponent,
    DocumentsComponent,
    ConnectionsComponent,
  ],
})
export class ProfileModule {}
