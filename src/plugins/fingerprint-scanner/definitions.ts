export interface FingerprintScannerPlugin {
    initializeDevice(): Promise<{ success: boolean }>;
    releaseDevice(): Promise<{ success: boolean }>;
    captureFingerprint(): Promise<{
        success: boolean;
        template?: string;
        quality?: number;
        image?: string;
    }>;
    compareTemplates(options: {
        template1: string;
        template2: string;
    }): Promise<{
        success: boolean;
        score: number;
        match: boolean;
    }>;
    getTouchStatus(): Promise<{ success: boolean; touched: boolean }>;
    setLedStatus(options: { enabled: boolean }): Promise<{ success: boolean }>;
}