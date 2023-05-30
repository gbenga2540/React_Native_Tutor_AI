//
//  MyAppInfoModule.m
//  TutorAI
//
//  Created by Akindeju on 5/29/23.
//
//



#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <MobileCoreServices/MobileCoreServices.h>
#import <React/RCTUtils.h>
#import <React/RCTBridgeModule.h>

@interface MyAppInfoModule : NSObject <RCTBridgeModule>

@end

@implementation MyAppInfoModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getAllInstalledApps:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSFileManager *fileManager = [NSFileManager defaultManager];
        NSArray *urls = [[NSFileManager defaultManager] URLsForDirectory:NSApplicationDirectory inDomains:NSAllDomainsMask];

        NSMutableArray *installedApps = [NSMutableArray array];

        for (NSURL *url in urls) {
            NSArray *appURLs = [fileManager contentsOfDirectoryAtURL:url includingPropertiesForKeys:@[NSURLNameKey, NSURLIsDirectoryKey] options:NSDirectoryEnumerationSkipsHiddenFiles error:nil];

            for (NSURL *appURL in appURLs) {
                NSString *bundleID = [[NSBundle bundleWithURL:appURL] bundleIdentifier];
                NSString *appName = nil;

                [appURL getResourceValue:&appName forKey:NSURLNameKey error:nil];

                BOOL isEnabled = [[UIApplication sharedApplication] canOpenURL:appURL];

                UIImage *appIcon = [self getAppIconFromURL:appURL];
                NSString *base64Icon = [self convertImageToBase64:appIcon];

                NSDictionary *appInfo = @{@"bundleID": bundleID ?: @"",
                                          @"name": appName ?: @"",
                                          @"icon": base64Icon ?: @"",
                                          @"isEnabled": @(isEnabled)};

                [installedApps addObject:appInfo];
            }
        }

        dispatch_async(dispatch_get_main_queue(), ^{
            resolve(installedApps);
        });
    });
}

- (UIImage *)getAppIconFromURL:(NSURL *)appURL {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *iconsFolder = [appURL.path stringByAppendingPathComponent:@"AppIcon.appiconset"];

    // Check if the icons folder exists
    if (![fileManager fileExistsAtPath:iconsFolder]) {
        // Return a default app icon
        UIImage *defaultIcon = [UIImage imageNamed:@"DefaultIcon"];
        return defaultIcon ?: [UIImage new];
    }

    NSArray *iconFiles = [fileManager contentsOfDirectoryAtPath:iconsFolder error:nil];
    NSArray *supportedImageFormats = @[@"png", @"jpg", @"jpeg"]; // Add any other supported formats here

    for (NSString *filename in iconFiles) {
        NSString *iconPath = [iconsFolder stringByAppendingPathComponent:filename];

        // Check if the file is an image
        NSString *fileExtension = filename.pathExtension.lowercaseString;
        if ([supportedImageFormats containsObject:fileExtension]) {
            UIImage *icon = [UIImage imageWithContentsOfFile:iconPath];
            if (icon) {
                return icon;
            }
        }
    }

    // Return a default app icon
    UIImage *defaultIcon = [UIImage imageNamed:@"DefaultIcon"];
    return defaultIcon ?: [UIImage new];
}

- (NSString *)convertImageToBase64:(UIImage *)image {
  NSData *imageData = nil;
  
    if (image) {
        imageData = UIImagePNGRepresentation(image);
        if (!imageData) {
            imageData = UIImageJPEGRepresentation(image, 1.0);
        }
    }

    if (!imageData) {
        return nil;
    }

    NSString *base64String = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    return base64String;
}




@end

