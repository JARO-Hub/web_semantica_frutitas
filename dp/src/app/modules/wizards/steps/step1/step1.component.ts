import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { ICreateAccount } from '../../create-account.helper';
import { KeeniconComponent } from "../../../../_buscador/shared/keenicon/keenicon.component";
import { NgIf } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  imports: [
    KeeniconComponent,
    ReactiveFormsModule,

  ]
})
export class Step1Component implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<ICreateAccount>;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, true);
  }

  initForm() {
    this.form = this.fb.group({
      accountType: [this.defaultValues.accountType, [Validators.required]],
    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
