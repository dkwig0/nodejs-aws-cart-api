import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class OrderService {
  constructor(private databaseService: DatabaseService) {}

  async findById(orderId: string): Promise<Order> {
    let result = await this.databaseService.query(
      `select * from orders where id = ${orderId}`,
    );
    return result.rows[0];
  }

  async create(data: any) {
    const id = v4();
    const order = {
      ...data,
      id,
      status: 'in_progress',
    };

    await this.databaseService.query(
      `
        INSERT INTO orders(id, user_id, cart_id, status, total, delivery, comments) 
        VALUES(
          ${id},
          ${order.userId},
          ${order.cartId},
          ${order.status},
          ${order.total ?? 0},
          ${order.delivery ?? null},
          ${order.comments ?? null})
      `,
    );
  }

  // update(orderId, data) {
  //   const order = this.findById(orderId);
  //
  //   if (!order) {
  //     throw new Error('Order does not exist.');
  //   }
  //
  //   this.orders[ orderId ] = {
  //     ...data,
  //     id: orderId,
  //   }
  // }
}
