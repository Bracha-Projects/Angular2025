import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { DashBoardComponent } from '../components/dash-board/dash-board.component';
import { NewCourseComponent } from '../components/new-course/new-course.component';
import { NewLessonComponent } from '../components/new-lesson/new-lesson.component';
import { authGuardGuard } from '../guards/auth-guard.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'courses', component: CoursesComponent,canActivate: [authGuardGuard] },
    { path: 'courses/:courseId/lessons', component: LessonsComponent,canActivate: [authGuardGuard] },
    { path: 'dashboard', component: DashBoardComponent,canActivate: [authGuardGuard] },
    { path: 'courses/newCourse', component: NewCourseComponent,canActivate: [authGuardGuard] },
    { path: 'courses/:courseId/edit', component: NewCourseComponent,canActivate: [authGuardGuard] },
    { path: 'courses/:courseId/lessons/new-lesson', component: NewLessonComponent,canActivate: [authGuardGuard] },
    { path: 'courses/:courseId/lessons/:lessonId/edit', component: NewLessonComponent,canActivate: [authGuardGuard] }
];
