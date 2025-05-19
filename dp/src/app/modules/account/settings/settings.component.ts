import { Component } from '@angular/core';
import { ProfileDetailsComponent } from "./forms/profile-details/profile-details.component";
import { SignInMethodComponent } from "./forms/sign-in-method/sign-in-method.component";
import { DeactivateAccountComponent } from "./forms/deactivate-account/deactivate-account.component";
import { NotificationsComponent } from "./forms/notifications/notifications.component";
import { EmailPreferencesComponent } from "./forms/email-preferences/email-preferences.component";
import { ConnectedAccountsComponent } from "./forms/connected-accounts/connected-accounts.component";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  imports: [
    ProfileDetailsComponent,
    SignInMethodComponent,
    DeactivateAccountComponent,
    NotificationsComponent,
    EmailPreferencesComponent,
    ConnectedAccountsComponent
  ]
})
export class SettingsComponent {
  constructor() {}
}
