package com.tutorai;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import androidx.annotation.NonNull;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.util.Base64;
import java.io.ByteArrayOutputStream;

public class MyAppInfoModule extends ReactContextBaseJavaModule {
        MyAppInfoModule(ReactApplicationContext context) {
                super(context);
        }

        @NonNull
        @Override
        public String getName() {
                return "MyAppInfoModule";
        }

        @ReactMethod
        public void getAllInstalledApps(final Promise promise) {
                AsyncTask.execute(new Runnable() {
                        @Override
                        public void run () {
                                try {
                                        PackageManager packageManager = getCurrentActivity().getPackageManager();
                                        List<ApplicationInfo> installedApplications = packageManager.getInstalledApplications(0);
                                        WritableArray appsArray = Arguments.createArray();

                                        for (ApplicationInfo appInfo : installedApplications) {
                                                if ((appInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0) {
                                                        String appName = appInfo.loadLabel(packageManager).toString();
                                                        String packageName = appInfo.packageName;
                                                        boolean isAppEnabled = appInfo.enabled;
                                                        Drawable appIcon = appInfo.loadIcon(packageManager);

                                                        Bitmap bitmap;
                                                        if (appIcon instanceof BitmapDrawable) {
                                                                bitmap = ((BitmapDrawable) appIcon).getBitmap();
                                                        } else {
                                                                bitmap = Bitmap.createBitmap(appIcon.getIntrinsicWidth(), appIcon.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
                                                                Canvas canvas = new Canvas(bitmap);
                                                                appIcon.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
                                                                appIcon.draw(canvas);
                                                        }

                                                        ByteArrayOutputStream ba_os = new ByteArrayOutputStream();
                                                        bitmap.compress(Bitmap.CompressFormat.PNG, 100, ba_os);
                                                        byte[] iconByteArray = ba_os.toByteArray();
                                                        String iconBase64 = Base64.encodeToString(iconByteArray, Base64.DEFAULT);

                                                        WritableMap appMap = Arguments.createMap();
                                                        appMap.putString("name", appName);
                                                        appMap.putString("bundleID", packageName);
                                                        appMap.putString("icon", iconBase64);
                                                        appMap.putBoolean("isEnabled", isAppEnabled);

                                                        appsArray.pushMap(appMap);
                                                }
                                        }
                                        promise.resolve(appsArray);
                                } catch (
                                        Exception e) {
                                        promise.reject("ERROR", e.getMessage());
                                }
                        }
                });
        }
}