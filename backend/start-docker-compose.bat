@echo off
set PATH=%PATH%;C:\Program Files\Docker\Docker\resources\bin
cd /d C:\Users\ornit\Documents\EscApp\Git\EscApp
"C:\Program Files\Docker\Docker\resources\bin\docker.exe" compose version
"C:\Program Files\Docker\Docker\resources\bin\docker.exe" compose up --build
