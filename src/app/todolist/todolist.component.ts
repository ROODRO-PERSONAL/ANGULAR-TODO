import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{
    taskName:'Weak Up at 4am', 
    isCompleted: false, 
    isEditable: false
  }];
  
  constructor() { }

  ngOnInit(): void {
    this.taskArray = JSON.parse(localStorage.getItem('todolist') || '[]');
  }


  onSubmit(form: NgForm) {
    this.taskArray.push({
        taskName: form.controls['task'].value, 
        isCompleted: false,
        isEditable: false
      });
    
    this.saveToLocalStorage();
    
    form.reset();
  }

  saveToLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(this.taskArray));
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveToLocalStorage();
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    this.saveToLocalStorage();
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
    this.saveToLocalStorage();
  }

  onSave(index: number, newTask: string) {
    this.taskArray[index].taskName = newTask;
    this.taskArray[index].isEditable = false;
    this.saveToLocalStorage();
  }
}
