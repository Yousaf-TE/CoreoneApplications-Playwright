import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private get testEquityLink() {
    return this.page.getByRole('link', { name: /TestEquity Group/i });
  }
  
  private get signInBtn() {
    return this.page.getByRole('button', { name: /Sign In/i });
  }
  
  private get emailField() {
    return this.page.getByRole('textbox', { name: /Type your full/i });
  }
  
  private get nextBtn() {
    return this.page.getByRole('button', { name: 'Next' });
  }
  
  private get passwordField() {
    return this.page.getByRole('textbox', { name: /Enter the password/i });
  }
  
  private get submitBtn() {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  async navigate() {
    await this.page.goto('/teq-margin-calculator/dashboard');
  }

  async openLoginWindow() {
    await this.testEquityLink.click();
    await this.page.waitForLoadState('networkidle'); // wait for the page to load
    await this.signInBtn.click();
    await this.page.waitForLoadState('networkidle'); // ensure page is fully loaded
  }

async enterEmail(email: string) {
  await this.page.waitForLoadState('networkidle'); // ensure page is fully loaded
  await expect(this.emailField).toBeVisible({ timeout: 60000 });
  await this.emailField.fill(email);
  await this.nextBtn.click();
}

async enterPassword(password: string) {
  await expect(this.passwordField).toBeVisible({ timeout: 60000 });
  await this.passwordField.fill(password);
  await this.submitBtn.click();
}
  async continue() {
    await this.nextBtn.click();
  }
}
