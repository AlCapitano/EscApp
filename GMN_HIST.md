# History of Gemini Interactions

- Added new interaction rules for history coherence, project coherence, and implementing best practices.
- Rewrote the frontend from Kotlin Multiplatform to React with TypeScript to support the latest Java SDK.
- The mobile strategy is to build a web-based proof of concept first, with the ultimate goal of a native mobile app.
- Implemented basic frontend UI, routing, and authentication flow. Fixed backend npm vulnerabilities.
- Scaffolded the frontend UI with placeholders for the Main Menu, Game Screen, and Leaderboard.
- Resolved authentication persistence and backend database connection issues. Implemented premade admin and mock user accounts. Confirmed successful login and full application functionality.
- Created `start_escapp.bat` to automate application shutdown, backend/frontend initialization, and browser launch.
- Enhanced `start_escapp.bat` to include Docker process management, ensuring a clean Docker state before starting services.
- Modified `start_escapp.bat` to remove aggressive `taskkill` commands for Docker Desktop and port-specific processes, relying instead on `docker-compose down -v` for graceful service shutdown and port release. The frontend `npm start` now handles its own port binding without forceful termination.
