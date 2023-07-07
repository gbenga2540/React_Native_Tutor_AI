package com.tutorai;

import android.content.ComponentName;
import android.content.Context;
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
        public void enableApp(String packageName, Promise promise) {
                PackageManager packageManager = reactContext.getPackageManager();
                if (packageName.length() == 0) {
                        promise.reject("INVALID_BUNDLE_ID", "The specified app was not found.");
                }
                try {
                        ApplicationInfo appInfo = packageManager.getApplicationInfo(packageName, 0);
                        appInfo.enabled = true;
                        packageManager.setApplicationEnabledSetting(
                                appInfo.packageName,
                                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                                PackageManager.DONT_KILL_APP
                        );
                        promise.resolve("APP_ENABLED");
                } catch (NameNotFoundException e) {
                        promise.reject("APP_NOT_FOUND", "The specified app was not found.");
                }
        }

        @ReactMethod
        public void disableApp(String packageName, Promise promise) {
                PackageManager packageManager = reactContext.getPackageManager();
                if (packageName.length() == 0) {
                        promise.reject("INVALID_BUNDLE_ID", "The specified app was not found.");
                }
                try {
                        ApplicationInfo appInfo = packageManager.getApplicationInfo(packageName, 0);
                        appInfo.enabled = false;
                        packageManager.setApplicationEnabledSetting(
                                appInfo.packageName,
                                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                                PackageManager.DONT_KILL_APP
                        );
                        promise.resolve("APP_IS_DISABLED");
                } catch (NameNotFoundException e) {
                        promise.reject("APP_NOT_FOUND", "The specified app was not found.");
                }
        }

        public void myHideApp(String bundleId, Promise promise) {
                new Thread(() -> {
                        try {
                                Context context = getReactApplicationContext();
                                PackageManager packageManager = context.getPackageManager();
                                ComponentName componentName = new ComponentName(context, bundleId);
                                packageManager.setComponentEnabledSetting(
                                        componentName,
                                        PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                                        PackageManager.DONT_KILL_APP
                                );

                                promise.resolve("App hidden successfully.");
                        } catch (Exception e) {
                                promise.reject("APP_HIDE_ERROR", e.getMessage());
                        }
                }).start();
        }
}
