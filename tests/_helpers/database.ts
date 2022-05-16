import mongoose from 'mongoose'
export const dropAllCollections = async (): Promise<void> => {
  const whiteListCollections: string[] = []

  const db = mongoose.connection.db

  // Get all collections
  const collections = await db.listCollections().toArray()

  // Create an array of collection names and drop each collection
  const promises = collections
    .map((collection) => collection.name)
    .map(async (collectionName) => {
      if (!whiteListCollections.includes(collectionName)) {
        return db.dropCollection(collectionName)
      }
    })

  await Promise.all(promises)
}

export function generateMongoObjectId(): string {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  return `${timestamp}xxxxxxxxxxxxxxxx`.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
}
