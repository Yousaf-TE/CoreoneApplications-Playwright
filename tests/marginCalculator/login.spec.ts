import { test } from '@playwright/test';
import { createContext } from '../../utils/context';
import { LoginPage } from '../../pages/login.page';
import { MFAPage } from '../../pages/mfa.page';
import { DashboardPage } from '../../pages/dashboard.page';

test('Login to Margin Calculator (POM)', async () => {

  const email = process.env.TEQ_EMAIL;
  const password = process.env.TEQ_PASSWORD;

  if (!email || !password) {
    throw new Error('Environment variables TEQ_EMAIL or TEQ_PASSWORD are missing');
  }

  const context = await createContext();
  const page = await context.newPage();

  const login = new LoginPage(page);
  const mfa = new MFAPage(page);
  const dashboard = new DashboardPage(page);

  await login.navigate();
  await login.openLoginWindow();

  await login.enterEmail(email);
  await login.enterPassword(password);
  await mfa.continueAfterPassword();

  await mfa.skipSecuritySetup();
  await mfa.disableFuturePrompts();

  // Dashboard actions
  await dashboard.createCalculator();
  await dashboard.logout();
  await context.close();
});
