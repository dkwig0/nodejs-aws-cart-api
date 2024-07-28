import { Injectable } from '@nestjs/common';
import { Cart, CartStatuses } from '../models';
import { v4 } from 'uuid';
import { DatabaseService, QueryItem } from '../../database/database.service';

@Injectable()
export class CartService {
  constructor(private databaseService: DatabaseService) {}

  async findByUserId(userId: string): Promise<Cart> {
    const result = await this.databaseService.query(
      `select * from carts as c where c.user_id = $1 and c.status = 'OPEN'`,
      [userId],
    );

    if (result.rows.length !== 1) {
      return null;
    }

    let cart: Cart = result.rows[0];

    let items = await this.databaseService.query(
      `select * from cart_items as ci join carts as c on c.id = ci.cart_id where c.id = $1`,
      [cart.id],
    );

    return {...cart, items: items.rows};
  }

  async createByUserId(userId: string): Promise<Cart> {
    const id = v4();

    const userCart = {
      id: id,
      items: [],
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: CartStatuses.OPEN,
    };

    await this.databaseService.query(
      `INSERT INTO carts (id, user_id, created_at, updated_at, status) 
       VALUES ($1,$2,$3,$4,$5)
    `,
    ),
      [
        userCart.id,
        userCart.user_id,
        userCart.created_at,
        userCart.updated_at,
        userCart.status,
      ];

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    const queryList: QueryItem[] = [];
    queryList.push({
      query: `update carts set updated_at = $1 WHERE user_id = $2 and status = 'OPEN'`,
      params: [new Date().toISOString(), userId],
    });

    updatedCart.items.forEach((item) => {
      queryList.push({
        query: `insert into cart_items (cart_id, product_id, count) values ($1, $2, $3)`,
        params: [id, item.product.id, item.count],
      });
    });

    await this.databaseService.transaction(queryList);

    return { ...updatedCart };
  }

  async removeByUserId(userId) {
    await this.databaseService.query(
      `update carts set status = 'ORDERED' WHERE user_id = '${userId}' and status = 'OPEN'`,
    );
  }
}
