package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.yourcompany.fingerprintattendance.plugins.fingerprintscanner.FingerprintScannerPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register custom plugin
        registerPlugin(FingerprintScannerPlugin.class);
    }
}