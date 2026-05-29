# To-Do List

This file tracks the remaining tasks to achieve a working prototype application for mobile phones, based on the rules in `GEMINI.md`.
## High Priority (Prototype)
- **Implement Frontend UI:**
  - Main Menu (DONE)
  - Game Screen (DONE)
  - Navigation structure for sidebar and back button for Game Screen (DONE)
  - Map-based game entry and Admin-only Game Selection (DONE)
  - Leaderboard (DONE)
  - Implement sidebar to be collapsible with an icon to expand/collapse when the user clicks/hovers. (DONE)
  - Implement a timer that after 7 seconds of no input the sidebar collapses.
- **Implement Frontend Logic:**
  - Game state management
  - Advanced routing
- **Integrate Frontend with Backend:**
  - Connect to game session APIs (Basic authentication is done, game-specific APIs need to be integrated)
- **Admin/User Experience Differentiation:**
  - **Admin:**
    - Modify checkpoints geolocation and position of checkpoint on main menu screen.
    - View user checkpoint progress.
    - Manage leaderboard.
  - **User:**
    - View current and previous checkpoints.
    - No modification rights on checkpoints or leaderboard.

## High Priority (Current Iteration)
- Fix Main Menu: map not visible, ensure markers are on top. (DONE)
- Implement conditional checkpoint visibility/clickability based on user progress. (DONE)
- Fix Checkpoint unlocking logic in Main Menu (Bug). (DONE)
- Remove "City Map of Utrecht" alt text display from Main Menu. (DONE)
- Add Admin-only button to Main Menu for `GameSelection`. (DONE)
- Remove "Game Selection" option from sidebar for non-admin users. (DONE)
- Admins to be able to drag the pins to other positions on the map.
- Confirm current logic for sequential checkpoint unlocking is correct and to be implemented for the rest.

## Medium Priority
- Resize the contents of pages such as 'Main menu' to the size of the browser or screen dynamically.

## Game Logic
- **Integrate Anti-Cheat System**
- **Integrate Puzzles**
- **Integrate Routes**

## Design
- **Create `ROUTE_RULES.md`**: Define the design rules for routes.

## Security
- **Address Frontend Vulnerabilities:**
  - Investigate and fix the remaining vulnerabilities in the frontend's dependencies.

## Testing
- **Thoroughly test the application.**

## Future
- **Native Mobile App:**
  - Plan and execute the migration to a native mobile application (e.g., using React Native).
g., using React Native).
