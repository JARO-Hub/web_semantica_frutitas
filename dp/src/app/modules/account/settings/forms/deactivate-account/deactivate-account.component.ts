import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
})
export class DeactivateAccountComponent {
  constructor() {}

  saveSettings() {
    alert('Account has been successfully deleted!');
  }
}
