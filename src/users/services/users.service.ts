import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UsersService {

  constructor(private databaseService: DatabaseService) {
  }

  async findOne(userId: string): Promise<User> {

    const result = await this.databaseService.query(`select * from users where id = ${userId}`);

    if (result.rows.length !== 1) {
      throw new Error("No unique result found with id " + userId);
    }

    return result.rows[0];
  }

  async createOne({ name }: User): Promise<User> {
    const id = v4();
    const newUser: User = {
      id: name || id,
      name,
      createdAt: new Date().toISOString(),
    } as User;

    await this.databaseService.query(
      `INSERT INTO users (id, name, created_at) VALUES (${newUser.id}, ${newUser.name}, ${newUser.createdAt})`);
    return newUser;
  }

}
