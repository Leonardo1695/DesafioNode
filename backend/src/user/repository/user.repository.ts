import { DataSource, Repository } from 'typeorm';

import User from '../entity/user.entity';
import { Inject, Injectable } from '@nestjs/common';

export class searchReturn {
  content: User[];
  totalElements: number;

  constructor(content: User[], totalElements: number) {
    this.content = content;
    this.totalElements = totalElements;
  }
}
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { id },
    });

    return user;
  }
}
