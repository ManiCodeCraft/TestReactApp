//
//  TouchID.swift
//  TestReactApp
//
//  Created by Mani Murugan on 04/03/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import LocalAuthentication
@objc class TouchID: NSObject {
  
  var context = LAContext()

  @objc func test(){
    
  }
  
  @objc func showAuthentication(callback:@escaping (Bool,String?)->Void){
    // Get a fresh context for each login. If you use the same context on multiple attempts
               //  (by commenting out the next line), then a previously successful authentication
               //  causes the next policy evaluation to succeed without testing biometry again.
               //  That's usually not what you want.
               context = LAContext()

               context.localizedCancelTitle = "Enter Username/Password"

               // First check if we have the needed hardware support.
               var error: NSError?
               if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {

                   let reason = "Log in to your account"
                   context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason ) { success, error in

                       if success {

                           callback(true,"Successfully Authenticated")

                       } else {
                           print(error?.localizedDescription ?? "Failed to authenticate")
                        callback(false,error?.localizedDescription)

                           // Fall back to a asking for username and password.
                           // ...
                       }
                   }
               } else {
                   print(error?.localizedDescription ?? "Can't evaluate policy")
                callback(false,(error?.localizedDescription ?? "Can't evaluate policy"))

                   // Fall back to a asking for username and password.
                   // ...
               }
  }

}
