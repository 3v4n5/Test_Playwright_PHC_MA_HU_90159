// @ts-check
const { defineConfig, devices } = require('@playwright/test');


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://labepsapps.suramericana.com/PHC/SrvPHCNoSeguro?dniUsuarioTran=71272123&fechaExpiracionToken=99999999999999999&loginUserService=pedrvevi&nameUserService=pedrvevi&modoIngreso=4&tipoDniusuarioTran=CC&valorDerecho=54&cdRol=18&cdProceso=0&pNProfesional=Beatriz&pAProfesional=Cano',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true, //visualizar pruebas en navegadores
    video: 'on', //graba video dela prueba
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //     use: { ...devices['Desktop Chrome'], 
    //     channel: 'chrome',
    //     launchOptions: {
    //           args: ['--ignore-certificate-errors'],
    //       },
    //     viewport: { width: 1420, height: 900 },
    //   },
    // },
      {
        name: 'chrome web',
        use: {
            browserName: 'chromium',
            launchOptions: {
                args: ['--ignore-certificate-errors']
            },
            viewport: { width: 1420, height: 900 },
            //baseURL: BASEURL,
        }
      }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
