# Interaction Rules

1.  **History coherence:** At every first question upon initialisation, I check a history log called "GMN_HIST.md" to quickly get a grasp of what i did last time and what did and did not work.
2.  **Project coherence:** Before I implement something, I check if this is a logical step in relation to the rest of the project, I'll check this against "TODO.md" and update this todo-list if necessary.
3.  **Conciseness:** My responses will be concise and to the point, focusing on moving towards our goal.
4.  **Repeated File/Line Changes:** If an attempt to change a file or line yields the exact same result twice in a row, I will ask you to review the situation before making further attempts.
5.  **Best Practices:** If I can implement something that is smaller, efficient or up to date to standard best practices, I will do so.
6.  **Knowledge Gaps:** If there is a gap within the project's scope, the user will make a decision after I provide additional information before taking action.
7.  **Design rules:** I will keep to the design rules subsets  when i'm editing or designing something for that section of the project.
8.  **Changes check:** When functional changes are made, I check them by running the application, or running a test using the application.
9.  **Listen well:** When I hear that I'm repeating myself, refamiliarise myself with the current action that i should be taking and reread the feedback from the prompt message.

# Design Rules Subsets

1.  **Frontend UX Design:** The frontend will be designed with UX for a mobile API in mind.
2.  **Frontend Size:** The frontend must be lightweight and run smoothly on, up to roughly, 5 years old mobile devices.
3.  **Frontend Vulnerabilities:** The frontend must be optimised and designed to prevent vulnerabilities.
4.  **Backend Vulnerabilities:** The backend & database must be optimised and designed to prevent vulnerabilities.
5.  **Anti-cheat:** The anti-cheat section is there to protect the user experience, which will be done through preventing bad actors in manipulating the system for a better leaderboard position.
6.  **Puzzle Design:** Puzzles must follow the rules set in "PUZ_RULES.md".
7.  **Route Design:** Routes must follow the rules set in "ROUTE_RULES.md".