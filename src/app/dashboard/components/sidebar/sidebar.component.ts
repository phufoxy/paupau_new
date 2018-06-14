import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home-dashboard', title: 'Tổng Quan', icon: 'content_paste', class: '' },
    { path: 'event-dashboard', title: 'Biểu Mẫu Sự Kiện', icon: 'event', class: '' },
    { path: 'news-dashboard', title: 'Tin Tức', icon: 'av_timer', class: '' },
    { path: 'feedback-dashboard', title: 'Phản Hồi', icon: 'feedback', class: '' },
    { path: 'trainer-dashboard', title: 'Biểu Mẫu Giáo Viên', icon: 'person', class: '' },
    { path: 'trainer-dashboard-detail', title: 'Giáo Viên', icon: 'class', class: '' },
    { path: 'course-dashboard', title: 'Biểu Mẫu Lớp', icon: 'assignment_ind', class: '' },
    { path: 'course-dashboard-detail', title: 'Danh Sách Lớp', icon: 'format_align_justify', class: '' },
    { path: 'setting-dashboard', title: 'Cài Đặt', icon: 'perm_data_setting', class: '' },
];
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

    menuItems: any[];

    constructor(public router: Router) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}
