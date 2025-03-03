import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { DashBoardComponent } from '../components/dash-board/dash-board.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'courses', component: CoursesComponent },
    {path:'courses/:courseId',component:LessonsComponent},
    {path:'dashboard',component:DashBoardComponent}
];
