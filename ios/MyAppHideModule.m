//
//  MyAppHideModule.m
//  TutorAI
//
//  Created by Akindeju on 5/30/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface MyAppHideModule : NSObject <RCTBridgeModule>
@end

@implementation MyAppHideModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(enableApp:(NSString *)bundleIdentifier resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    if (bundleIdentifier.length == 0) {
        reject(@"INVALID_BUNDLE_ID", @"Invalid bundle ID provided.", nil);
        return;
    }
    
    NSURL *prefsURL = [NSURL URLWithString:[NSString stringWithFormat:@"prefs:root=%@", bundleIdentifier]];
    NSURL *appPrefsURL = [NSURL URLWithString:[NSString stringWithFormat:@"App-Prefs:root=%@", bundleIdentifier]];
    
    if ([[UIApplication sharedApplication] canOpenURL:prefsURL]) {
        [[UIApplication sharedApplication] openURL:prefsURL options:@{} completionHandler:nil];
        resolve(@"APP_ENABLED");
    } else if ([[UIApplication sharedApplication] canOpenURL:appPrefsURL]) {
        resolve(@"APP_ALREADY_ENABLED");
    } else {
        reject(@"APP_NOT_FOUND", @"The specified app was not found.", nil);
    }
}

RCT_EXPORT_METHOD(disableApp:(NSString *)bundleIdentifier resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    if (bundleIdentifier.length == 0) {
        reject(@"INVALID_BUNDLE_ID", @"Invalid bundle ID provided.", nil);
        return;
    }
    
    NSURL *prefsURL = [NSURL URLWithString:[NSString stringWithFormat:@"prefs:root=%@", bundleIdentifier]];
    NSURL *appPrefsURL = [NSURL URLWithString:[NSString stringWithFormat:@"App-Prefs:root=%@", bundleIdentifier]];
    
    if ([[UIApplication sharedApplication] canOpenURL:appPrefsURL]) {
        [[UIApplication sharedApplication] openURL:appPrefsURL options:@{} completionHandler:nil];
        resolve(nil);
    } else if ([[UIApplication sharedApplication] canOpenURL:prefsURL]) {
        resolve(@"APP_IS_DISABLED");
    } else {
        reject(@"APP_NOT_FOUND", @"The specified app was not found.", nil);
    }
}

@end
