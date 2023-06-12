import { Injectable } from '@nestjs/common';
import User from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find();
    return result;
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await this.userRepository.findById(id);
    return result;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.userRepository.findByEmail(email);
    return result;
  }
}
