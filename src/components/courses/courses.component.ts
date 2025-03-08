import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CoursesService } from '../../services/courses/courses.service';
import { AsyncPipe } from '@angular/common';
import { Course } from '../../types/course';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatListModule, AsyncPipe, MatIconModule, MatToolbarModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Observable<Course[]> | undefined;
  role: string | null = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')!) : null;
  constructor(private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    this.coursesService.getCourses();
    this.courses = this.coursesService.courses$;
    console.log(this.courses);
  }

  enroll(courseId: number) {
    this.coursesService.addUserToCourse(courseId);
  }

  showLessons(courseId: number) {
    this.router.navigate([`/courses/${courseId} }`]);
  }

  signOut() {
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId);
  }

  addCourse() {
    this.router.navigate(['/newCourse']);
  }

  edit(courseId: number) {
    let course = this.coursesService.getCourseById(courseId);
    localStorage.setItem('course', JSON.stringify(course));
    this.router.navigate(['courses/' + courseId + '/edit']);
  }
}
