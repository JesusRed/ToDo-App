import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @OneToMany(() => TodoEntity, (todo: TodoEntity) => todo.user)
  todos: TodoEntity[];

  // async verifyPassword(password: string) {
  //   const hash = await bcrypt.compare(password, this.salt);
  //   return hash == this.password;
  //   return await bcrypt.compare(password, this.password);
  // }
}
