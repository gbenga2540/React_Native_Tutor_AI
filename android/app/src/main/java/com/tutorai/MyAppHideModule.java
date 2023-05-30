package com.tutorai;

import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class MyAppHideModule extends ReactContextBaseJavaModule {
        private final ReactApplicationContext reactContext;

        public MyAppHideModule(ReactApplicationContext reactContext) {
                super(reactContext);
                this.reactContext = reactContext;
        }

        @Override
        public String getName() {
                return "MyAppHideModule";
        }

        @ReactMethod
        public void hideApp(String packageName, Promise promise) {
                PackageManager packageManager = reactContext.getPackageManager();
                try {
                        ApplicationInfo appInfo = packageManager.getApplicationInfo(packageName, 0);
                        appInfo.enabled = false;
                        packageManager.setApplicationEnabledSetting(
                                appInfo.packageName,
                                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                                PackageManager.DONT_KILL_APP
                        );
                        promise.resolve(null);
                } catch (NameNotFoundException e) {
                        promise.reject("APP_NOT_FOUND", "The specified app was not found.");
                }
        }

        @ReactMethod
        public void showApp(String packageName, Promise promise) {
                PackageManager packageManager = reactContext.getPackageManager();
                try {
                        ApplicationInfo appInfo = packageManager.getApplicationInfo(packageName, 0);
                        appInfo.enabled = true;
                        packageManager.setApplicationEnabledSetting(
                                appInfo.packageName,
                                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                                PackageManager.DONT_KILL_APP
                        );
                        promise.resolve(null);
                } catch (NameNotFoundException e) {
                        promise.reject("APP_NOT_FOUND", "The specified app was not found.");
                }
        }
}
