@echo off
CHCP 65001 > NUL

REM --- 1. Shutdown EscApp if it's running ---

REM Stop and remove docker-compose services and volumes
echo Shutting down Docker services...
docker-compose down -v

REM --- 2. Initialize all the backend/frontend stuff ---

REM Start docker-compose services (backend and database)
echo Starting Docker services...
docker-compose up -d

REM Wait for backend to be ready (optional, but good practice)
echo Waiting for backend to start...
timeout /t 8 /nobreak > NUL

REM Start frontend
echo Starting frontend...
start /B cmd /c "cd frontend && npm start"

REM --- 3. Opens up the localhost:3001 url in the users default browser ---

REM Wait for frontend to be ready (optional, but good practice)
echo Waiting for frontend to compile...
timeout /t 7 /nobreak > NUL

echo Opening http://localhost:3001 in your default browser...
start http://localhost:3001

echo EscApp started.
