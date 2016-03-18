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

## Release

**In Android**

Generate key if first release

    KEY_STORE=/path/to/keystore make generate-key

Setup the global gradle properties if first release

    vim ~/.gradle/gradle.properties

        WEB_CUPELS_ZATA_RELEASE_STORE_FILE=/path/to/keystore
        WEB_CUPELS_ZATA_RELEASE_KEY_ALIAS=web-cupels-zata
        WEB_CUPELS_ZATA_RELEASE_STORE_PASSWORD=*****
        WEB_CUPELS_ZATA_RELEASE_KEY_PASSWORD=*****

Edit the gradle build script if first release

    vim ./android/app/build.gradle

        signingConfigs {
            release {
                storeFile file(WEB_CUPELS_ZATA_RELEASE_STORE_FILE)
                storePassword WEB_CUPELS_ZATA_RELEASE_STORE_PASSWORD
                keyAlias WEB_CUPELS_ZATA_RELEASE_KEY_ALIAS
                keyPassword WEB_CUPELS_ZATA_RELEASE_KEY_PASSWORD
            }
        }

        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
                ...
            }
        }

