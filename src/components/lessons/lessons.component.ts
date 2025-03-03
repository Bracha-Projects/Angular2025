import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../types/lesson';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [MatListModule, AsyncPipe],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  courseId: number | undefined;
  lessons: Observable<Lesson[]> | undefined;
  constructor(private lessonsService: LessonsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('courseId'))
        this.courseId = parseInt(params.get('courseId') || '');
      console.log(this.courseId); // כאן תוכל לראות את ה-courseId
    });
    if(this.courseId) {
      this.lessonsService.getLessons(this.courseId);
      this.lessons = this.lessonsService.lessons$;
    }
    console.log(this.lessons);
  }

}
