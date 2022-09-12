import nock, { back } from 'nock'
import { join, dirname } from 'path'
import fs from 'fs'
import slugify from 'slugify'
import { NETWORK_ALLOWED_HOSTS } from './disableNetwork'

const FIXTURES_FOLDER_NAME = 'networkMocks'

test.withMockNetwork = async (
  name: string,
  fn?: jest.ProvidesCallback,
  timeout?: number,
) => {
  const fixturesPath = join(dirname(expect.getState().testPath as string), FIXTURES_FOLDER_NAME)
  const fileName = `${slugify(name)}.json`
  const file = join(fixturesPath, fileName)

  if (fs.existsSync(file)) {
    const requests = JSON.parse(fs.readFileSync(file).toString())

    requests.forEach((request: any) => {
      (nock as any)(request.scope)[request.method.toLocaleLowerCase()](request.path)
        .reply(request.status, request.response)
    })
  }

  return test(name, fn, timeout);
}

test.recordNetwork = async (
  name: string,
  fn?: any,
  timeout?: number,
) => {
  const execution = async (...args: any): Promise<void> => {
    if (fn) {
      back.setMode('record')

      const fixturesPath = join(dirname(expect.getState().testPath as string), FIXTURES_FOLDER_NAME)
      const fileName = `${slugify(name)}.json`
      const file = join(fixturesPath, fileName)

      back.fixtures = fixturesPath

      const { nockDone } = await back(fileName)
      await fn(...args)
      nockDone()
      handleResponse(file)
    }
  }

  return test(name, execution as any, timeout);
}

  const readRequestsFromFile = () => JSON.parse(fs.readFileSync(file).toString())

  const removeAllowedHosts = (request: any) => {
    return !NETWORK_ALLOWED_HOSTS.some(host => request.scope.includes(host))
  }

  const useObjectHeaders = (request: any) => {
    request.headers = {}
    for (let index = 0; index < request.rawHeaders.length; index += 2) {
      request.headers[request.rawHeaders[index]] = request.rawHeaders[index + 1]
    }
    delete request.rawHeaders
    return request
  }

  const requests = readRequestsFromFile()
    .filter(removeAllowedHosts)
    .map(useObjectHeaders)

  fs.writeFileSync(file, JSON.stringify(requests, undefined, 2))
}
