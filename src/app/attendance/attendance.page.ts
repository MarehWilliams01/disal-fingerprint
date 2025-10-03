import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    checkmarkCircle,
    closeCircle,
    fingerPrint,
    personAdd
} from 'ionicons/icons';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.page.html',
    styleUrls: ['./attendance.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButton,
        IonIcon,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonLabel
    ]
})
export class AttendancePage implements OnInit {
    isDeviceReady = false;
    attendanceRecords: any[] = [];
    enrolledUsers: any[] = [];

    constructor() {
        // Add icons to the registry
        addIcons({
            'checkmark-circle': checkmarkCircle,
            'close-circle': closeCircle,
            'fingerprint': fingerPrint,
            'person-add': personAdd
        });
    }

    ngOnInit() {
        // Initialize your component logic here
        this.checkDeviceReady();
        this.loadAttendanceRecords();
        this.loadEnrolledUsers();
    }

    checkDeviceReady() {
        // Add your device ready check logic here
        this.isDeviceReady = true; // Set based on actual device status
    }

    loadAttendanceRecords() {
        // Load attendance records from your service/storage
        // Example dummy data:
        this.attendanceRecords = [
            {
                userId: 1, // Add userId to match with enrolled users
                timestamp: new Date(),
                status: 'Present'
            },
            {
                userId: 2,
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                status: 'Present'
            }
        ];
    }

    loadEnrolledUsers() {
        // Load enrolled users from your service/storage
        // Example dummy data:
        this.enrolledUsers = [
            {
                name: 'John Doe',
                id: 1
            },
            {
                name: 'Jane Smith',
                id: 2
            }
        ];
    }

    markAttendance() {
        // Add your fingerprint attendance logic here
        console.log('Mark attendance clicked');
    }

    enrollUser() {
        // Add your user enrollment logic here
        console.log('Enroll user clicked');
    }

    getUserName(userId: any): string {
        // Find the user by ID and return their name
        const user = this.enrolledUsers.find(u => u.id === userId);
        return user ? user.name : 'Unknown User';
    }
}