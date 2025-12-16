import { Page } from '@playwright/test';

export class MFAPage {
  private nextBtn;
  private skipSetupBtn;
  private dontShowAgainCheckbox;
  private yesBtn;

  constructor(private page: Page) {
    this.nextBtn = this.page.getByRole('button', { name: 'Next' });
    this.skipSetupBtn = this.page.getByRole('button', { name: /Skip setup/i });
    this.dontShowAgainCheckbox = this.page.getByRole('checkbox', { name: /Don't show this again/i });
    this.yesBtn = this.page.getByRole('button', { name: 'Yes' });
  }

  async continueAfterPassword() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000); // Wait for 2 seconds to ensure the page is fully loaded
    await this.nextBtn.click();
  }

  async skipSecuritySetup() {
    await this.skipSetupBtn.click();
  }

  async disableFuturePrompts() {
    await this.dontShowAgainCheckbox.click();
    await this.yesBtn.click();
  }
}
