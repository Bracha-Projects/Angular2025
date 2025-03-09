import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../types/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();
  constructor(private http: HttpClient) { }

  getCourses() {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Course[]>('http://localhost:3000/api/courses', { headers })
      .subscribe(courses => this.coursesSubject.next(courses));
  }

  getCourseById(courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Course>(`http://localhost:3000/api/courses/${courseId}`, { headers });
  }

  addCourse(course: Partial<Course>) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://localhost:3000/api/courses', course, { headers })
      .subscribe(() => this.getCourses());
  }

  updateCourse(course: Partial<Course>,courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`http://localhost:3000/api/courses/${courseId}`, course, { headers })
      .subscribe(() => this.getCourses());
  }

  deleteCourse(courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`http://localhost:3000/api/courses/${courseId}`, { headers })
      .subscribe(() => this.getCourses());
  }

  addUserToCourse(courseId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = localStorage.getItem('userID');
    if(!userId) {
      return;
    }
    this.http.post(`http://localhost:3000/api/courses/${courseId}/enroll`, {userId}, { headers })
      .subscribe(() => this.getCourses());
  }
  // deleteUserFromCourse(courseId: number) {
  //   const token = sessionStorage.getItem('token');
  //   if(!token) {
  //     return;
  //   }
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const userId = localStorage.getItem('userID');
  //   if(!userId) {
  //     return;
  //   }
  //   this.http.delete(`http://localhost:3000/api/courses/${courseId}/unenroll`,{userId}, { headers })
  //    .subscribe(() => this.getCourses());
  // }
}
