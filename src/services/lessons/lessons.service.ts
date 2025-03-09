import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from '../../types/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  lessons$ = this.lessonsSubject.asObservable();
  constructor(private httpClient : HttpClient) { }

  getLessons(courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    this.httpClient.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(lessons => this.lessonsSubject.next(lessons));
  }

  getLessonById(lessonId: number, courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    return this.httpClient.get<Lesson>(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  addLesson(lesson: Partial<Lesson>, courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    this.httpClient.post(`http://localhost:3000/api/courses/${courseId}/lessons`, lesson, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(() => this.getLessons(courseId));
  }

  updateLesson(lesson: Partial<Lesson>, courseId: number, lessonId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    this.httpClient.put(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, lesson, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(() => this.getLessons(courseId));
  }

  deleteLesson(lessonId: number, courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    this.httpClient.delete(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(() => this.getLessons(courseId));
  }
}
