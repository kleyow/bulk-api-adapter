'use strict'

const Test = require('tape')
const Hapi = require('hapi')
const HapiOpenAPI = require('hapi-openapi')
const Path = require('path')
const Mockgen = require('../../data/mockgen')
// const imp = require('../../../../src/interface/swagger.yaml')

/**
 * Test for /transfers/{id}/error
 */
Test('/transfers/{id}/error', function (t) {
  /**
     * summary: Abort a transfer
     * description:
     * parameters: content-type, date, x-forwarded-for, fspiop-source, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, id, body
     * produces:
     * responses: default
     */
  t.test('test putTransfersIdError put operation', async function (t) {
    const server = new Hapi.Server()

    await server.register({
      plugin: HapiOpenAPI,
      options: {
        api: Path.resolve(__dirname, '../../../../src/interface/swagger.yaml'),
        handlers: Path.join(__dirname, '../../../../src/api/handlers'),
        outputvalidation: true
      }
    })

    const requests = new Promise((resolve, reject) => {
      Mockgen().requests({
        path: '/transfers/{id}/error',
        operation: 'put'
      }, function (error, mock) {
        return error ? reject(error) : resolve(mock)
      })
    })

    const mock = await requests

    t.ok(mock)
    t.ok(mock.request)
    // Get the resolved path from mock request
    // Mock request Path templates({}) are resolved using path parameters
    const options = {
      method: 'put',
      url: '' + mock.request.path
    }
    if (mock.request.body) {
      // Send the request body
      options.payload = mock.request.body
    } else if (mock.request.formData) {
      // Send the request form data
      options.payload = mock.request.formData
      // Set the Content-Type as application/x-www-form-urlencoded
      options.headers = options.headers || {}
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // If headers are present, set the headers.
    if (mock.request.headers && mock.request.headers.length > 0) {
      options.headers = mock.request.headers
    }

    const response = await server.inject(options)

    t.equal(response.statusCode, 200, 'Ok response status')
    t.end()
  })
})