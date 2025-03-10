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
    this.coursesService.addUserToCourse(courseId).subscribe({
      next: () => {
        console.log('המשתמש נרשם בהצלחה!');
        alert('המשתמש נרשם בהצלחה!');
        this.coursesService.getCourses(); // עדכון רשימת הקורסים
      },
      error: (err) => {
        console.error('Error enrolling user:', err);
        alert(`שגיאה בהרשמה לקורס: ${err.message}`);
      }
    });
  }

  unenroll(courseId: number, userId: number) {
    this.coursesService.unenrollStudent(courseId, userId).subscribe({
      next: (response: any) => {
        console.log('Success:', response);
        alert('המשתמש הוסר מהקורס בהצלחה!');
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert('שגיאה בהסרת המשתמש מהקורס');
      }
    });
  }

  showLessons(courseId: number) {
    this.router.navigate([`/courses/${courseId}/lessons`]);
  }

  signOut() {
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  eleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId).subscribe({
      next: () => {
        console.log('הקורס נמחק בהצלחה!');
        alert('הקורס נמחק בהצלחה!');
        this.coursesService.getCourses(); // עדכון רשימת הקורסים
      },
      error: (err) => {
        console.error('Error deleting course:', err);
        alert(`שגיאה במחיקת הקורס: ${err.message}`);
      }
    });
  }

  addCourse() {
    this.router.navigate(['courses/newCourse']);
  }

  edit(courseId: number) {
    this.coursesService.getCourseById(courseId)!.subscribe(
      (course: Course) => {
        const regularCourse = { ...course };
        localStorage.setItem('course', JSON.stringify(regularCourse));  
        console.log("edit",localStorage.getItem('course'));
        this.router.navigate(['courses/' + courseId + '/edit']);
      },
      (error) => {
        console.error('Error loading course:', error);
      }
    );
  }
}
