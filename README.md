# QRchive
Have you ever scanned a QR code, then lost track of it? Often QR code scans are a "one and done" thing and this is no big deal. But often enough (and always when it's least convenient), it would be *really* nice to recall something that you scanned earlier. That was the driving thought behind this project.  

We wanted to make an easy 1-stop shop where you can both scan a code and store the decoded results in an archive. This way, you can always pull it up later! This program can run on a smart phone, like most scanner apps. That said, since it's a web app, it also means that you can easily fire it up on a desktop computer or laptop to scan a QR code too! As long as you're using a supported browser and have a connected camera detected by it, you should be able to scan a code and archive it.  
  
So, without further ado, please enjoy the submission for Team **"It's not a bug, it's a feature"** for Beaverhacks Fall 2022!  

# Features
* QR Code Scanner that works from browsers with camera support.  
* Scan a code from your smart phone, laptop, or even a desktop PC!  
* Save any QR code you scan to an archive - access them again without need to rescan!  

# Verified Browser Support
* Google Chrome (Windows, Android)
* Edge (Windows, Android)
* Firefox (Windows)
* Firefox Focus (Android)

# Notes 
* Archives are stored using your browser's local storage in a JSON file (so will reset if you wipe local storage). 
* Each browser you use will have its own distinct archive file, since they use their own local storage attributes.
* JavaScript must be enabled in your browser for the program to function.
* Camera must not be blocked in the browser you are trying to run the app from. The camera setting may need to be changed from "ask first" to "allowed while app is running" on the system level for some browsers (encounted with Edge on Android), to allow the ask-first option for camera use within the browser's settings. As long as you are prompted for camera access and OK it, the scanner should work, in our tests. If the program doesn't appear to be working when trying to scan something, there's a good chance it's being caused by your camera being blocked by your browser.

# Video Demo
https://www.youtube.com/embed/HS3ooqR8dVc
