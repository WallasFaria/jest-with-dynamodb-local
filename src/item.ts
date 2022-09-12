import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'

// Strongly typed model
class File extends Document {
  id!: string
  name!: string
}

export const FileModel = dynamoose.model<File>('files', { 'id': String, 'name': String })
