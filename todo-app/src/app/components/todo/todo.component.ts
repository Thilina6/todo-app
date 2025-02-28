import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  title = '';
  description = '';

  constructor(public todoService: TodoService) {}

  addTodo() {
    if (this.title.trim() && this.description.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.title,
        description: this.description,
      };
      this.todoService.addTodo(newTodo);
      this.title = '';
      this.description = '';
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
