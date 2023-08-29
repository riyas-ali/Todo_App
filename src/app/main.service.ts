import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'enviroment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get(enviroment.back_end);
  }

  addTodo(params:any) {
    return this.http.post(enviroment.back_end + "/add", params)
  }

  updateTitle(todo_id: any, params: any) {
    return this.http.put(enviroment.back_end + "/update_title/" + todo_id, params)
  }

  updateStatus(todo_id: string, params: any) {
    return this.http.put(enviroment.back_end + "/update_status/" + todo_id, params)
  }

  deleteTodo(todo_id:any) {
    return this.http.delete(enviroment.back_end + "/delete_todo/" + todo_id)
  }

}
