import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../Model/DTO/create-todo.dto';
import { TodoStatus } from '../Model/Entity/todo.entity';
import { TodoStatusValidationPipe } from '../pipes/TodoStatusValidationPipe.pipe';

//http://localhost:3000/api/todos
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  //Http GET verb
  @Get('/list')
  getAllTodos() {
    //console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos();
  }

  @Post('/add')
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {
    //const { title, description } = data;
    return this.todoService.createTodo(data);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
  ) {
    return this.todoService.update(id, status);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
