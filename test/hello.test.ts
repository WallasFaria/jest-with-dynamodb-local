import { db } from "../src/dbConfig"
import { hello } from "../src/hello"
import { FileModel } from "../src/item"
import { back } from 'nock'

describe('hello', () => {
  test('log "hello world!"', () => {
    console.log = jest.fn()
    hello()

    expect(console.log).toBeCalledWith('hello world!')
  })

  it('should insert item into table', async () => {
    await db
      .put({ TableName: 'files', Item: { id: '1', hello: 'world' } })
      .promise();

    const { Item } = await db.get({ TableName: 'files', Key: { id: '1' } }).promise();

    expect(Item).toEqual({
      id: '1',
      hello: 'world',
    });
  });

  it('should insert item into table with dynamoose', async () => {
    const { nockDone } = await back('success')
    await FileModel.create({ id: '2', name: 'secound item' })

    const file = await FileModel.get({ id: '2' })

    nockDone()

    expect(file.toJSON()).toEqual({
      id: '2',
      name: 'secound item',
    });
  });
})
