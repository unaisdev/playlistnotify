#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import "RNAppAuthAuthorizationFlowManager.h"

@interface AppDelegate : RCTAppDelegate <UIApplicationDelegate, RCTBridgeDelegate, RNAppAuthAuthorizationFlowManager>

@property(nonatomic, weak)id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;

@end
