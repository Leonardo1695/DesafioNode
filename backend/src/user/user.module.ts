import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { UserController } from '../user/controller/user.controller';
import { UserService } from '../user/service/user.service';
import User from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
