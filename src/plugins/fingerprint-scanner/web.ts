import { WebPlugin } from '@capacitor/core';
import type { FingerprintScannerPlugin } from './definitions';

export class FingerprintScannerWeb extends WebPlugin implements FingerprintScannerPlugin {
  async initializeDevice(): Promise<{ success: boolean }> {
    console.log('Web: initializeDevice called');
    return { success: true };
  }

  async releaseDevice(): Promise<{ success: boolean }> {
    return { success: true };
  }

  async captureFingerprint(): Promise<{ success: boolean; template?: string; quality?: number }> {
    // Mock implementation for testing
    return {
      success: true,
      template: 'mock_template_' + Date.now(),
      quality: 85
    };
  }

  async compareTemplates(): Promise<{ success: boolean; score: number; match: boolean }> {
    return { success: true, score: 75, match: true };
  }

  async getTouchStatus(): Promise<{ success: boolean; touched: boolean }> {
    return { success: true, touched: true };
  }

  async setLedStatus(): Promise<{ success: boolean }> {
    return { success: true };
  }
}