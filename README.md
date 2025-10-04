# disal-fingerprint
disal fingerprint functionality

Step-by-Step Guide: Integrating the AGF200 Scanner with Ionic
This guide provides a complete walkthrough for creating a custom Cordova plugin to bridge the native AGF200 fingerprint scanner SDK with an Ionic/Angular application.

Phase 1: Prerequisites & Native Asset Extraction
Before writing code, we need the right tools and the native libraries from the scanner's demo application.

Step 1: Required Tools
Node.js & npm: Essential for the Ionic ecosystem.

Ionic & Cordova CLIs: You'll need to install these globally using npm.

Android Studio: Required for the Android SDK and build tools.

JADX: A decompiler to extract files from the Android APK. Download from the JADX GitHub page.

Step 2: Extract Libraries from the Demo APK
This is the most critical step. We need the compiled code that talks to the scanner hardware.

Launch the JADX GUI application.

Go to File -> Open files... and select the X-Telcom AGF200 Fingerprint Demo APK.

JADX will decompile the package.

Find Native Libraries (.so files): In the file tree, navigate to Resources -> lib. You will see folders like armeabi-v7a, arm64-v8a, etc. Save all of these folders and their contents.

Find the Java Library (.jar file): Look for a .jar file, often located in a libs directory inside the decompiled source. If you can't find a .jar, it means the SDK's Java classes are mixed with the app's source code. In this case, use JADX to identify the main package name for the SDK (e.g., com.xtelcom.sdk...).

You should now have a folder containing the .so files (inside their architecture subfolders) and the .jar file.

Phase 2: Building the Custom Cordova Plugin
This plugin will act as the bridge between the JavaScript of your Ionic app and the native Java/C++ of the scanner SDK.

Step 1: Create a Blank Plugin
Open your terminal and navigate to a convenient workspace (like your Desktop).

Run the Cordova command to create the plugin's boilerplate structure, giving it a name and an ID.

Change into the newly created directory.

Step 2: Add Native Files to the Plugin
In the plugin's folder, navigate to the src/android/ directory.

Create two new folders here: jniLibs and libs.

Copy the CPU architecture folders (armeabi-v7a, etc.) containing the .so files into src/android/jniLibs/.

Copy the .jar file you extracted into src/android/libs/.

Step 3: Configure plugin.xml
This file is the manifest for your plugin. It tells Cordova how to install the native files into the final Android project. You will need to edit this XML file to:

Define the JavaScript module.

Add a feature entry for the Android platform, pointing to your native Java class.

Include the .jar file as a <lib-file>.

Include each .so file as a <source-file>, specifying its target directory within the final Android project structure.

Important: You must replace placeholder filenames in the XML with the actual filenames you extracted.

Step 4: Define the JavaScript Interface
Open the plugin's JavaScript file located in the www directory. This file defines the functions you will call from your Ionic app. You will export functions (e.g., initialize, captureImage) that use the Cordova exec method to call the native code.

Step 5: Write the Native Java Bridge
Create the main Java plugin file in the src/android/ directory. This is the core of the bridge. This class should extend Cordova's CordovaPlugin and override the execute method. Inside execute, you will check which action was called from JavaScript and then dispatch it to a private Java method. These private methods (e.g., initializeScanner, captureImage) will contain the actual calls to the SDK's functions that you imported from the .jar file. It's best practice to run these native calls on a background thread.

Phase 3: Using the Plugin in Your Ionic App
Now, let's use the plugin we just built.

Step 1: Create an Ionic App
In your terminal, run the Ionic CLI command to start a new, blank Angular-based application and navigate into the project folder.

Step 2: Add the Custom Plugin
Install the plugin you created from its local path on your computer using the ionic cordova plugin add command.

Step 3: Create an Angular Service Wrapper
A service makes the plugin much cleaner to use. Use the Ionic CLI to generate a new service. Inside this service, you will create methods that wrap the plugin calls in Promises, making them easy to use with async/await in your application pages.

Step 4: Use the Service in a Page
Modify a page in your Ionic app to call the service. In the page's TypeScript file, inject your new service and create methods that are triggered by user actions (like button clicks). These methods will call the service's functions and update a status property on the page to display results or errors. In the page's HTML file, add buttons that bind to these methods.

Phase 4: Build and Deploy
Step 1: Add the Android Platform
Use the Cordova CLI to add the Android platform to your Ionic project.

Step 2: Build and Run on the Device
Connect the fingerprint scanner device via USB. Then, run the Ionic CLI command to build the app and deploy it directly to the connected device. This command will build, install, and launch the app, allowing you to test the functionality.
