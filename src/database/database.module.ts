import { Global, Module } from '@nestjs/common'
import { DatabaseService } from './database.service';
import { Pool } from 'pg'

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: 'POSTGRES',
      useFactory: async () => {
        const pool = new Pool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT,
          max: 10,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 30000,
          ssl: {
            rejectUnauthorized: false
          }
        })

        return pool
      },
    },
  ],
  exports: ['POSTGRES', DatabaseService],
})
export class DatabaseModule {}