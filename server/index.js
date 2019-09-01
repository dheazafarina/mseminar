// const { Nuxt, Builder } = require('nuxt')
// const app = require('express')()

// // We instantiate Nuxt.js with the options
// const isProd = process.env.NODE_ENV === 'production'
// let config = require('../nuxt.config.js')
// config.dev = !isProd
// const nuxt = new Nuxt(config)
// // No build in production
// const promise = (isProd ? Promise.resolve() : new Builder(nuxt).build())
// promise.then (() => {
//   app.use(nuxt.render)
//   app.listen(3000)
// })
// .catch ((err) => {
//   process.exit(1)
// })

const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()


