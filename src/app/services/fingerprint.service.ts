import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { FingerprintScannerPlugin } from '../../plugins/fingerprint-scanner/definitions';

const FingerprintScanner = Capacitor.registerPlugin<FingerprintScannerPlugin>('FingerprintScanner');

export interface User {
    id: string;
    name: string;
    fingerprintTemplate: string;
}

export interface AttendanceRecord {
    id: string;
    userId: string;
    timestamp: Date;
    matchScore: number;
}

@Injectable({
    providedIn: 'root'
})
export class FingerprintService {
    private isDeviceInitialized = false;

    async initializeDevice(): Promise<boolean> {
        try {
            const result = await FingerprintScanner.initializeDevice();
            this.isDeviceInitialized = result.success;
            return this.isDeviceInitialized;
        } catch (error) {
            console.error('Failed to initialize device:', error);
            return false;
        }
    }

    async enrollFingerprint(): Promise<string | null> {
        if (!this.isDeviceInitialized) {
            throw new Error('Device not initialized');
        }

        try {
            const result = await FingerprintScanner.captureFingerprint();
            if (result.success && result.template) {
                return result.template;
            }
            return null;
        } catch (error) {
            console.error('Enrollment failed:', error);
            return null;
        }
    }

    async verifyFingerprint(enrolledTemplates: User[]): Promise<User | null> {
        if (!this.isDeviceInitialized) {
            throw new Error('Device not initialized');
        }

        try {
            const captureResult = await FingerprintScanner.captureFingerprint();
            if (!captureResult.success || !captureResult.template) {
                return null;
            }

            for (const user of enrolledTemplates) {
                const compareResult = await FingerprintScanner.compareTemplates({
                    template1: captureResult.template,
                    template2: user.fingerprintTemplate
                });

                if (compareResult.success && compareResult.match) {
                    return user;
                }
            }

            return null;
        } catch (error) {
            console.error('Verification failed:', error);
            return null;
        }
    }

    async releaseDevice(): Promise<void> {
        try {
            await FingerprintScanner.releaseDevice();
            this.isDeviceInitialized = false;
        } catch (error) {
            console.error('Failed to release device:', error);
        }
    }
}