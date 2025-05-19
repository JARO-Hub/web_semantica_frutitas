import { Component, OnInit } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import {
  SearchResultInnerComponent
} from "../../../../../partials/layout/extras/dropdown-inner/search-result-inner/search-result-inner.component";
import {
  DropdownMenu1Component
} from "../../../../../partials/content/dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgFor } from "@angular/common";

type Project = {
  image: string;
  title: string;
  link: string;
};

const projects: ReadonlyArray<Project> = [
  {
    image: './assets/media/svg/brand-logos/bebo.svg',
    title: 'Briviba SaaS',
    link: 'By James',
  },
  {
    image: './assets/media/svg/brand-logos/vimeo.svg',
    title: 'Vine Quick Reports',
    link: 'By Andres',
  },
  {
    image: './assets/media/svg/brand-logos/kickstarter.svg',
    title: 'KC Account CRM',
    link: 'By Keenthemes',
  },
  {
    image: './assets/media/svg/brand-logos/balloon.svg',
    title: 'Baloon SaaS',
    link: 'By SIA Team',
  },
  {
    image: './assets/media/svg/brand-logos/infography.svg',
    title: 'Most Cloudy UMC',
    link: 'By Andrei',
  },
  {
    image: './assets/media/svg/brand-logos/disqus.svg',
    title: 'Disqus Forum',
    link: 'By Disqus Inc.',
  },
  {
    image: './assets/media/svg/brand-logos/plurk.svg',
    title: 'Proove Quick CRM',
    link: 'By Proove Limited',
  },
];
@Component({
  selector: "app-projects-tab",
  templateUrl: "./projects-tab.component.html",
  imports: [
    SearchComponent,
    SearchResultInnerComponent,
    DropdownMenu1Component,
    InlineSVGModule,
    NgFor
  ]
})
export class ProjectsTabComponent implements OnInit {
  allProjects: ReadonlyArray<Project> = [];
  constructor() {}

  ngOnInit(): void {
    this.allProjects = projects;
  }
}
