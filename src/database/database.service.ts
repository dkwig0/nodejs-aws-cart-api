import { Injectable, Inject } from '@nestjs/common'
import { Pool } from 'pg'

export type QueryItem = { query: string; params?: any[] }

@Injectable()
export class DatabaseService {
  constructor(@Inject('POSTGRES') private readonly pool: Pool) {}

  async query(queryText: string, params?: any[]) {
    const client = await this.pool.connect()
    try {
      const res = await client.query(queryText, params)
      return res
    } finally {
      client.release()
    }
  }

  async startTransaction() {
    const client = await this.pool.connect()
    await client.query('BEGIN')
    return client
  }

  async commit(client) {
    await client.query('COMMIT')
  }

  async rollback(client) {
    await client.query('ROLLBACK')
  }

  async transaction(queries: QueryItem[]) {
    console.log('TRANSACTION', queries)
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const results = []
      for (const { query, params } of queries) {
        const res = await client.query(query, params)
        results.push(res)
      }
      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }
}