import nock from 'nock'

export const NETWORK_ALLOWED_HOSTS = [
  'localhost:8000'
]

nock.disableNetConnect()
nock.enableNetConnect(host => NETWORK_ALLOWED_HOSTS.some(allowedHost => host.includes(allowedHost)))
