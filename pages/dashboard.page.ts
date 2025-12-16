import { Page } from '@playwright/test';

export class DashboardPage {
  private skipSetupBtn: any;
  private dontShowAgainCheckbox: any;
  private yesBtn: any;
  private createCalcLink: any;
  private logoutBtn: any;
  private avatar: any;

  constructor(private page: Page) {
    this.skipSetupBtn = this.page.getByRole('button', { name: /Skip setup/i });
    this.dontShowAgainCheckbox = this.page.getByRole('checkbox', { name: /Don't show this again/i });
    this.yesBtn = this.page.getByRole('button', { name: 'Yes' });
    this.createCalcLink = this.page.getByRole('link', { name: 'Create New Calculator' });
    this.logoutBtn = this.page.getByRole('button', { name: 'Log Out' });
    this.avatar = this.page.locator('div[data-scope="avatar"][data-part="root"]');
  }

  async completeSetup() {
    await this.skipSetupBtn.click();
    await this.dontShowAgainCheckbox.click();
    await this.yesBtn.click();
  }

  async createCalculator() {
    await this.createCalcLink.click();
  }

  async logout() {
    await this.avatar.click();
    await this.logoutBtn.click();
  }
}
