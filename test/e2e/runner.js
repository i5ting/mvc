const path = require('path')
const http = require('http')
const spawn = require('cross-spawn')
const app = require('../../app')

const server = http.createServer(app.callback())

app.listen(8080)

var args = process.argv.slice(2)
if (args.indexOf('--config') === -1) {
  args = args.concat(['--config', 'test/e2e/nightwatch.config.js'])
}
if (args.indexOf('--env') === -1) {
  args = args.concat(['--env', 'chrome'])
}

var i = args.indexOf('--test')
if (i > -1) {
  args[i + 1] = 'test/e2e/specs/' + args[i + 1] + '.js'
}

var runner = spawn('./node_modules/.bin/nightwatch', args, {
  stdio: 'inherit'
})

runner.on('exit', function (code) {
  server.close(function () {
    console.log("server close")
  })

  process.exit(code)
})

runner.on('error', function (err) {
  server.close(function () {
    console.log("server close")
  })

  throw err
})