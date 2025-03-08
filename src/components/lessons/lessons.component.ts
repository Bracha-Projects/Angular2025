import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../types/lesson';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [MatListModule, AsyncPipe,MatToolbarModule],
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
    this.router.navigate([`/courses/${this.courseId}/newLesson`]);
  }

}
