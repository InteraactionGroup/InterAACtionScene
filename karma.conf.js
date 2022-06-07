// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configgeuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    proxies: {
      '/assets/': '/base/src/assets/'
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/InterAACtionScene'),
      reports: ['html', 'lcovonly', 'text-summary'],
      'report-config': {
        html: { subdir: 'html' }
      },
      thresholds: {
        global: {
          statements: 50,
          lines: 50,
          branches: 50,
          functions: 50
        }
      },
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: [
          "--headless",
          "--disable-gpu",
          "--no-sandbox", // required to run without privileges in docker
          "--remote-debugging-port=9222", // Without a remote debugging port, Google Chrome exits immediately.
          "--js-flags=--max-old-space-size=4096"
        ]
      }
    },
    singleRun: true
  });
};
