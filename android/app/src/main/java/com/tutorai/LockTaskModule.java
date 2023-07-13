package com.tutorai;

import android.app.ActivityManager;
import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LockTaskModule extends ReactContextBaseJavaModule {

        @Override
        public String getName() {
                return "LockTaskModule";
        }

        private final ReactApplicationContext reactContext;

        public LockTaskModule(ReactApplicationContext reactContext) {
                super(reactContext);
                this.reactContext = reactContext;
        }




        // Starts lock task mode
        @ReactMethod
        public void startLockTask() {
                if (getCurrentActivity() != null) {
                        getCurrentActivity().startLockTask();
                }
        }

        // Stops lock task mode
        @ReactMethod
        public void stopLockTask() {
                if (getCurrentActivity() != null) {
                        getCurrentActivity().stopLockTask();
                }
        }

        // Returns whether lock is on or not (Boolean/Promise)
        @ReactMethod
        public void isLockTaskOn(Promise promise) {
                promise.resolve(isLockTaskModeActive());
        }

        // Checks if lock task mode is active or not
        private boolean isLockTaskModeActive() {
                ActivityManager activityManager = (ActivityManager) reactContext.getSystemService(Context.ACTIVITY_SERVICE);
                return (activityManager.getLockTaskModeState() != ActivityManager.LOCK_TASK_MODE_NONE);
        }



}