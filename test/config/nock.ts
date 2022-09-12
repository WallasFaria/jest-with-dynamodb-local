import nock, { back } from 'nock'

back.fixtures = `${__dirname}/../fixtures`
nock.disableNetConnect()
// nock.enableNetConnect('localhost:8000')