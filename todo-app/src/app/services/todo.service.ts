import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/tasks';

  todos = signal<Todo[]>([]);

  constructor(private http: HttpClient) {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe((data) => this.todos.set(data));
  }

  addTodo(todo: Todo) {
    this.http.post<Todo>(this.apiUrl, todo).subscribe((newTodo) => {
      this.todos.update((prevTodos) => [...prevTodos, newTodo]);
    });
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.todos.update((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  }
}
