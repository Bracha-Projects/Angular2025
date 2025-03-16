import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-new-lesson',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './new-lesson.component.html',
  styleUrl: './new-lesson.component.css'
})
export class NewLessonComponent implements OnInit, OnDestroy {
  lessonForm: FormGroup;
  addOrUpdate: boolean = false;
  courseId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private lessonsService: LessonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.lessonForm = this.fb.group({ title: [''], content: [''] });
  }
  ngOnDestroy(): void {
    console.log('NewlessonComponent is being destroyed');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('courseId'))
        this.courseId = parseInt(params.get('courseId') || '');
      console.log(this.courseId); 
    });

    let lesson = localStorage.getItem("lesson");
    console.log("lesson: ", lesson);
    if (lesson) {
      const parsedlesson = JSON.parse(lesson);
      this.addOrUpdate = true;
      this.lessonForm.patchValue({ title: parsedlesson.title, content: parsedlesson.content });
      localStorage.removeItem('lesson');
    }
    else {
      this.lessonForm.patchValue({ title: '', content: '' });
    }
  }

  onSubmit() {
    const lesson = {
      title: this.lessonForm.get('title')?.value,
      content: this.lessonForm.get('content')?.value,
      courseId: this.courseId
    };

    if (this.addOrUpdate) {
      let lessonId = +this.route.snapshot.paramMap.get('lessonId')!;
      if (this.courseId !== undefined) {
        this.lessonsService.updateLesson(lesson, this.courseId, lessonId);
      } else {
        console.error('Course ID is undefined');
      }
    } else {
      if (this.courseId !== undefined) {
        this.lessonsService.addLesson(lesson, this.courseId);
      } else {
        console.error('Course ID is undefined');
      }
    }
    this.router.navigate([`/courses/${this.courseId}/lessons`]);
  }
}
