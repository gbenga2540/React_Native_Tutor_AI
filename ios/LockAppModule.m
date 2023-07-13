//
//  LockAppModule.m
//  TutorAI
//
//  Created by Akindeju on 7/10/23.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@interface LockAppModule : NSObject <RCTBridgeModule>

@end

@implementation LockAppModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(enableSingleAppMode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAccessibilityRequestGuidedAccessSession(YES, ^(BOOL granted) {
      if (granted) {
        NSLog(@"Single App Mode enabled");
        resolve(@(YES));
      } else {
        reject(@"enable_single_app_mode_failed", @"Failed to enable Single App Mode", nil);
      }
    });
  });
}

RCT_EXPORT_METHOD(disableSingleAppMode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAccessibilityRequestGuidedAccessSession(NO, ^(BOOL released) {
      if (released) {
        NSLog(@"Single App Mode disabled");
        resolve(@(YES));
      } else {
        reject(@"disable_single_app_mode_error", @"Failed to disable Single App Mode", nil);
      }
    });
  });
}

@end

