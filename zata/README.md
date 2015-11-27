# Zata

## Installation

**Install packages**

    npm install

**Setup Toast for iOS**

1. Drag `node_modules/react-native-toast/ios/RCTToast.xcodeproj` to project `zata > Libraries` in Xcode

2. Drag `zata > Libraries > RCTToast.xcodeproj > Products > libRCTToast.a` to `zata > Targets > zata > Build Phases > Link Binary With Libraries`

3. Open `zata > Targets > zata > Build Settings > All > Combined` search `header search paths`

4. Double click on `Header Search Paths` value and add value `$(SRCROOT)/../node_modules/react-native/React` with `recursive`

## Run

**In Android**

    react-native run-android

**In iOS**

    open `ios/zata.xcodeproj` and click run button
