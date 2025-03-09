import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-new-course',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule],
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent implements OnInit, OnDestroy {
  courseForm: FormGroup;
  addOrUpdate: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private coursesService: CoursesService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({ title: [''], description: [''] });
  }
  ngOnDestroy(): void {
    console.log('NewCourseComponent is being destroyed');
  }

  ngOnInit(): void {
    let course = localStorage.getItem("course");
    console.log("course: ",course);
    if (course) {
      const parsedCourse = JSON.parse(course);
      this.addOrUpdate = true;
      this.courseForm.patchValue({ title: parsedCourse.title, description: parsedCourse.description });
      localStorage.removeItem('course'); 
      console.log("i'm oninit",parsedCourse);
    }
    else{
      this.courseForm.patchValue({ title: '', description: '' });
    }
    console.log("i'm oninit",this.courseForm);  
  }

  onSubmit() {
    const course = {
      title: this.courseForm.get('title')?.value,
      description: this.courseForm.get('description')?.value,
      teacherId: localStorage.getItem('userID') ? parseInt(localStorage.getItem('userID')!) : 0
    };
    let courseId = +this.route.snapshot.paramMap.get('courseId')!;
    if (this.addOrUpdate) {
      this.coursesService.updateCourse(course, courseId);
    } else {
      this.coursesService.addCourse(course);
    }
    this.router.navigate([`/courses`]);
  }
}
