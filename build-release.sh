#!/bin/bash

sed -i "s/android:debuggable=\"true\"/android:debuggable=\"false\"/g" platforms/android/AndroidManifest.xml

cordova build android --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore res/keys/psoft.keystore ./platforms/android/ant-build/MkMoves-release-unsigned.apk psoft

zipalign 4 ./platforms/android/ant-build/MkMoves-release-unsigned.apk MkMoves.apk

sed -i "s/android:debuggable=\"false\"/android:debuggable=\"true\"/g" platforms/android/AndroidManifest.xml
