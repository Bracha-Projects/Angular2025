import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CoursesService } from '../../services/courses/courses.service';
import { AsyncPipe } from '@angular/common';
import { Course } from '../../types/course';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatListModule, AsyncPipe, MatIconModule, MatToolbarModule,MatButtonModule,MatDividerModule,MatCardModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Observable<Course[]> | undefined;
  role: string | null = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')!) : null;
  studentCourses: Course[] = [];
  constructor(private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    let studentId = localStorage.getItem('userID'); // שליפת ה-studentId מ-localStorage
    if (studentId) {
      this.coursesService.getStudentCourses(studentId).subscribe({
        next: (courses) => {
          this.studentCourses = courses;
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
          alert(`שגיאה בשליפת הקורסים: ${err.message}`);
        }
      });
    } else {
      alert('לא נמצא מזהה משתמש (userID) ב-Local Storage');
    }
    this.coursesService.getCourses();
    this.courses = this.coursesService.courses$;
    console.log("courses", this.courses);
    console.log("studentCourses", this.studentCourses);
  }

  enroll(courseId: number) {
    this.coursesService.addUserToCourse(courseId).subscribe({
      next: () => {
        console.log('המשתמש נרשם בהצלחה!');
        alert('המשתמש נרשם בהצלחה!');
        this.coursesService.getCourses(); // עדכון רשימת הקורסים
        this.coursesService.getCourses(); // ריענון הקורסים
        this.coursesService.getCourseById(courseId)?.subscribe({
          next: (course) => {
            this.studentCourses.push(course);
          },
          error: (err) => {
            console.error('Error fetching course:', err);
            alert(`שגיאה בשליפת הקורס: ${err.message}`);
          }
        });
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
            alert(`ש��י��ה בהרשמה להקו����: ${err.message}`);
          }
        });
      }

  unenroll(courseId: number) {
    let studentId = localStorage.getItem('userID');
    if (studentId === null)
      return;// שליפת ה-studentId מ-localStorage
    this.coursesService.unenrollStudent(courseId, +studentId).subscribe({
      next: (response: any) => {
        console.log('Success:', response);
        alert('המשתמש הוסר מהקורס בהצלחה!');
        this.studentCourses = this.studentCourses.filter(course => course.id !== courseId); // הסרת הקורס מרשימת המשתמש
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

  deleteCourse(courseId: number) {
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
        console.log("edit", localStorage.getItem('course'));
        this.router.navigate(['courses/' + courseId + '/edit']);
      },
      (error) => {
        console.error('Error loading course:', error);
      }
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.studentCourses.some(course => course.id === courseId);
  }
}
