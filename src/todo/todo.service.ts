import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from '../Model/Entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../Model/DTO/create-todo.dto';
import * as moment from 'moment';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.repo.find();
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const todo = new TodoEntity();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.status = TodoStatus.OPEN;
    // todo.dateCreated = Date.now();
    todo.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
    try {
      return await this.repo.save(todo);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, ToDo not created, reason: ' + err,
      );
    }
  }

  async update(id: number, status: TodoStatus) {
    try {
      await this.repo.update({ id }, { status });
      return this.repo.findOneBy({ id });
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, ToDo not updated, reason: ' + err,
      );
    }
  }

  async delete(id: number) {
    try {
      return await this.repo.delete({ id });
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, ToDo not deleted, reason: ' + err,
      );
    }
  }
}
