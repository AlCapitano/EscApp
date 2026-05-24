export declare const GameState: {
    readonly CREATED: "CREATED";
    readonly STARTED: "STARTED";
    readonly AT_CHECKPOINT: "AT_CHECKPOINT";
    readonly PUZZLE_ACTIVE: "PUZZLE_ACTIVE";
    readonly PUZZLE_SOLVED: "PUZZLE_SOLVED";
    readonly WAITING_FOR_VALIDATION: "WAITING_FOR_VALIDATION";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type GameState = typeof GameState[keyof typeof GameState];
