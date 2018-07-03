// http://nightwatchjs.org/guide#settings-file
const fs = require('fs')
const path = require('path')
const srcFolders = ['test/e2e/specs']

module.exports = {
    'src_folders': srcFolders,
    'output_folder': 'test/e2e/reports',
    'custom_commands_path': ['node_modules/nightwatch-helpers/commands'],
    'custom_assertions_path': ['node_modules/nightwatch-helpers/assertions'],

    'selenium': {
        'start_process': true,
        'server_path': require('selenium-server').path,
        'host': '127.0.0.1',
        'port': 4444,
        'cli_args': {
            'webdriver.chrome.driver': require('chromedriver').path
            // , 'webdriver.gecko.driver': require('geckodriver').path
        }
    },

    'test_settings': {
        'default': {
            'selenium_port': 4444,
            'selenium_host': 'localhost',
            'silent': true,
            'screenshots': {
                'enabled': true,
                'on_failure': true,
                'on_error': false,
                'path': 'test/e2e/screenshots'
            }
        },

        'chrome': {
            'desiredCapabilities': {
                'browserName': 'chrome',
                'javascriptEnabled': true,
                'acceptSslCerts': true
            }
        }
    }
}