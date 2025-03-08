import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-new-course',
  standalone: true,
  imports: [ReactiveFormsModule,MatToolbarModule],
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent implements OnInit{
  courseForm: FormGroup;
  courseDetails: {title: [''], description:['']} = {title: [''], description:['']};
  addOrUpdate:boolean = false;
  constructor(private fb: FormBuilder, private coursesService: CoursesService, private router:Router) {
    this.courseForm = this.fb.group(this.courseDetails);
  }
  ngOnInit(): void {
    let course = localStorage.getItem('course');
    if(course) {
      this.courseDetails = JSON.parse(course)
      this.addOrUpdate = true;
    }
  }

  onSubmit() {
    const course = {
      title: JSON.stringify(this.courseForm.get('title')?.value),
      description: JSON.stringify(this.courseForm.get('description')?.value),
      userId: localStorage.getItem('userID') ? parseInt(localStorage.getItem('userID')!) : 0
    }
    this.coursesService.addCourse(course);
    this.router.navigate(['/courses']);
  }
}
