import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { DashBoardComponent } from '../components/dash-board/dash-board.component';
import { NewCourseComponent } from '../components/new-course/new-course.component';
import { NewLessonComponent } from '../components/new-lesson/new-lesson.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'courses/:courseId/lessons', component: LessonsComponent },
    { path: 'dashboard', component: DashBoardComponent },
    { path: 'courses/newCourse', component: NewCourseComponent },
    { path: 'courses/:courseId/edit', component: NewCourseComponent },
    { path: 'courses/:courseId/lessons/new-lesson', component: NewLessonComponent },
    { path: 'courses/:courseId/lessons/:lessonId/edit', component: NewLessonComponent }
];
