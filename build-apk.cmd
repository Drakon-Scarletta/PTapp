@echo off
REM Baut die PTapp-APK. Ohne Argument: signierte Release-APK.
REM Aufruf:  build-apk.cmd  [debug]

setlocal

REM Java und Android-SDK liegen standardmaessig unter %USERPROFILE%\android-toolchain.
REM Wer sie woanders hat, setzt JAVA_HOME / ANDROID_HOME vorher selbst.
if not defined JAVA_HOME set "JAVA_HOME=%USERPROFILE%\android-toolchain\jdk21"
if not defined ANDROID_HOME set "ANDROID_HOME=%USERPROFILE%\android-toolchain\sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

if not exist "%JAVA_HOME%\bin\java.exe" (
  echo Kein JDK unter "%JAVA_HOME%". JAVA_HOME setzen oder Java 21 dorthin legen.
  exit /b 1
)

cd /d "%~dp0"

echo == Quellcode buendeln ==
call npm run build:release || goto :fehler

echo == Web-Dateien nach android/ kopieren ==
call npx cap sync android || goto :fehler

if /I "%~1"=="debug" (
  set "TASK=assembleDebug"
  set "OUT=android\app\build\outputs\apk\debug\app-debug.apk"
) else (
  set "TASK=assembleRelease"
  set "OUT=android\app\build\outputs\apk\release\app-release.apk"
)

echo == %TASK% ==
cd /d "%~dp0android"
call "%~dp0android\gradlew.bat" %TASK% || goto :fehler
cd /d "%~dp0"

echo.
echo Fertig: %OUT%
dir "%OUT%"
exit /b 0

:fehler
echo.
echo Build fehlgeschlagen.
exit /b 1
