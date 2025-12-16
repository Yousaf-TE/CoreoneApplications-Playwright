import { chromium, BrowserContext } from '@playwright/test';
import fs from 'fs';

export async function createContext(): Promise<BrowserContext> {
  if (fs.existsSync('./user-data')) {
    fs.rmSync('./user-data', { recursive: true, force: true });
  }

  return chromium.launchPersistentContext('./user-data', {
    headless: true,
    args: [
      '--disable-site-isolation-trials',
      '--unlimited-storage',
      '--disable-web-security',
      '--allow-third-party-cookies'
    ]
  });
}
