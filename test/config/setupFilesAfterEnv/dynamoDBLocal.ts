import dynamoose from 'dynamoose'

dynamoose.aws.ddb.set(new dynamoose.aws.sdk.DynamoDB({
  endpoint: 'localhost:8000',
  sslEnabled: false,
  region: 'local-env'
}))
