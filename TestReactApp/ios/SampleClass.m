//
//  SampleClass.m
//  TestReactApp
//
//  Created by Mani Murugan on 04/03/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "SampleClass.h"
#import "AppDelegate.h"
#import <React/RCTLog.h>
#import "TestReactApp-Swift.h"
@implementation SampleClass

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  dispatch_async(dispatch_get_main_queue(), ^{
     // do work here
    UIAlertController* alert = [UIAlertController alertControllerWithTitle:name
                                message:location
                                preferredStyle:UIAlertControllerStyleAlert];

     UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                                    handler:^(UIAlertAction * action) {}];

     [alert addAction:defaultAction];
     AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
     [delegate.window.rootViewController presentViewController:alert animated:YES completion:nil];
  });
}

RCT_EXPORT_METHOD(showAuthentication:(RCTResponseSenderBlock)callback)
 {

   
   TouchID *touchID = [TouchID new];
   [touchID showAuthenticationWithCallback:^(BOOL success, NSString *responseString) {
     
     callback(@[[NSNumber numberWithBool:success], responseString]);

//     if(success){
//       callback(@[[NSNull null], @"Successfully Authenticated"]);
//     }else{
//       callback(@[error, @"Authentication Failed"]);
//     }
   }];

 }


@end
