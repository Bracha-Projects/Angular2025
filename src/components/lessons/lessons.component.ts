import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../types/lesson';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [MatListModule, AsyncPipe,MatToolbarModule,MatCardModule,MatListModule, MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  courseId: number | undefined;
  lessons: Observable<Lesson[]> | undefined;
  role: string | null = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')!) : null;
  constructor(private lessonsService: LessonsService, private route: ActivatedRoute, private router:Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('courseId'))
        this.courseId = parseInt(params.get('courseId') || '');
      console.log(this.courseId); 
    });
    if(this.courseId) {
      this.lessonsService.getLessons(this.courseId);
      this.lessons = this.lessonsService.lessons$;
    }
    console.log(this.lessons);
  }

  signOut()
  {
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  addLesson(){
    this.router.navigate([`/courses/${this.courseId}/lessons/new-lesson`]);
  }

  editLesson(lessonId: number) {
      if (this.courseId !== undefined) {
        this.lessonsService.getLessonById(lessonId, this.courseId)?.subscribe(
        (lesson: Lesson) => {
          const regularLesson = { ...lesson };
          localStorage.setItem('lesson', JSON.stringify(regularLesson));  
          console.log("edit", localStorage.getItem('lesson'));
          this.router.navigate(['courses/' + this.courseId + '/lessons/'+ lessonId +'/edit']);
        },
        (error) => {
          console.error('Error loading lesson:', error);
      });
      } else {
        console.error('courseId is undefined');
      }
  }

  deleteLesson(lessonId: number) {
    if (this.courseId !== undefined) {
      this.lessonsService.deleteLesson(lessonId, this.courseId);
    } else {
      console.error('courseId is undefined');
    }
  }

}
 