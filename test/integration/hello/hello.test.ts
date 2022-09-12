import { hello } from '../../../src/hello'
import { FileModel } from '../../../src/item'
import axios from 'axios'
import { db } from '../../../src/dbConfig'

describe('hello', () => {
  test("log 'hello world!'", () => {
    console.log = jest.fn()
    hello()

    expect(console.log).toBeCalledWith('hello world!')
  })

  it.mockNetwork('should insert item into table', async () => {
    await db
      .put({ TableName: 'files', Item: { id: '1', hello: 'world' } })
      .promise();

    const { Item } = await db.get({ TableName: 'files', Key: { id: '1' } }).promise();

    const resp = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    expect(resp.status).toBe(200)

    expect(Item).toEqual({
      id: '1',
      hello: 'world',
    });
  });

  test.mockNetwork('should insert item into table with dynamoose and requet google',  async () => {
    await FileModel.create({ id: '2', name: 'secound item' })
    const resp = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    expect(resp.status).toBe(200)

    const file = await FileModel.get({ id: '2' })

    expect(file.toJSON()).toEqual({
      id: '2',
      name: 'secound item',
    });
  });
})
