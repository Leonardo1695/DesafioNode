import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'email', length: 80 })
  email: string;

  @Column('varchar', { name: 'password', length: 80 })
  @Exclude()
  password: string;

  @Exclude()
  async validPassword(password: string) {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }
}
