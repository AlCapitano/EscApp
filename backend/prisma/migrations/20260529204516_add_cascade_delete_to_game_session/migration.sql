-- DropForeignKey
ALTER TABLE "CheckpointAttempt" DROP CONSTRAINT "CheckpointAttempt_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "CheckpointAttempt" ADD CONSTRAINT "CheckpointAttempt_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
