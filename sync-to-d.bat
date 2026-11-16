@echo off
echo ========================================================
echo   Syncing SMART TREND DIGITAL to D:\STD
echo ========================================================
echo.
echo Make sure you have run the following in Administrator PowerShell:
echo icacls D:\STD /grant "%%USERNAME%%:(OI)(CI)F" /T
echo.
pause
echo Copying files...
robocopy "C:\Users\User\STD" "D:\STD" /E /XD node_modules .git /XF .DS_Store
echo.
echo Sync Complete! You can now run "npm install" inside D:\STD if needed.
pause
