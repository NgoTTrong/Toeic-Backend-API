-- CreateEnum
CREATE TYPE "Answer" AS ENUM ('A', 'B', 'C', 'D');

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "password" TEXT,
    "rankId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rankIcon" TEXT NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "NotificationUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFeed" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "CategoryFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeFeed" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "feedId" INTEGER NOT NULL,

    CONSTRAINT "LikeFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentFeed" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "feedId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "CommentFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyCommentFeed" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ReplyCommentFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audioUrl" TEXT NOT NULL,
    "breakPoints" INTEGER[],
    "thumbnail" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "part1Id" INTEGER NOT NULL,
    "part2Id" INTEGER NOT NULL,
    "part3Id" INTEGER NOT NULL,
    "part4Id" INTEGER NOT NULL,
    "part5Id" INTEGER NOT NULL,
    "part6Id" INTEGER NOT NULL,
    "part7Id" INTEGER NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryExam" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "CategoryExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeExam" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,

    CONSTRAINT "LikeExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentExam" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "CommentExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyCommentExam" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ReplyCommentExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part1" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part1Question" (
    "id" SERIAL NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "questionId" INTEGER NOT NULL,
    "part1Id" INTEGER NOT NULL,

    CONSTRAINT "Part1Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part2" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part2Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audioUrl" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "part2Id" INTEGER NOT NULL,

    CONSTRAINT "Part2Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part3" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part3Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audioUrl" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "part3Id" INTEGER NOT NULL,

    CONSTRAINT "Part3Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MappingPart3Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part3QuestionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "MappingPart3Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part4" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part4Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audioUrl" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "part4Id" INTEGER NOT NULL,

    CONSTRAINT "Part4Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MappingPart4Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part4QuestionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "MappingPart4Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part5" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part5Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part5Id" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Part5Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part6" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part6Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrls" TEXT[],
    "part6Id" INTEGER NOT NULL,

    CONSTRAINT "Part6Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MappingPart6Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part6QuestionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "MappingPart6Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part7" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Part7_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part7Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrls" TEXT[],
    "part7Id" INTEGER NOT NULL,

    CONSTRAINT "Part7Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MappingPart7Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part7QuestionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "MappingPart7Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "optionA" TEXT,
    "optionB" TEXT,
    "optionC" TEXT,
    "optionD" TEXT,
    "answer" "Answer" NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_id_email_idx" ON "User"("id", "email");

-- CreateIndex
CREATE INDEX "Rank_id_idx" ON "Rank"("id");

-- CreateIndex
CREATE INDEX "Notification_id_idx" ON "Notification"("id");

-- CreateIndex
CREATE INDEX "NotificationUser_id_userId_idx" ON "NotificationUser"("id", "userId");

-- CreateIndex
CREATE INDEX "Feed_id_idx" ON "Feed"("id");

-- CreateIndex
CREATE INDEX "CategoryFeed_id_idx" ON "CategoryFeed"("id");

-- CreateIndex
CREATE INDEX "LikeFeed_userId_feedId_idx" ON "LikeFeed"("userId", "feedId");

-- CreateIndex
CREATE INDEX "CommentFeed_userId_feedId_idx" ON "CommentFeed"("userId", "feedId");

-- CreateIndex
CREATE INDEX "ReplyCommentFeed_commentId_userId_idx" ON "ReplyCommentFeed"("commentId", "userId");

-- CreateIndex
CREATE INDEX "Exam_id_idx" ON "Exam"("id");

-- CreateIndex
CREATE INDEX "CategoryExam_id_idx" ON "CategoryExam"("id");

-- CreateIndex
CREATE INDEX "LikeExam_userId_examId_idx" ON "LikeExam"("userId", "examId");

-- CreateIndex
CREATE INDEX "CommentExam_userId_examId_idx" ON "CommentExam"("userId", "examId");

-- CreateIndex
CREATE INDEX "ReplyCommentExam_commentId_userId_idx" ON "ReplyCommentExam"("commentId", "userId");

-- CreateIndex
CREATE INDEX "Part1_id_idx" ON "Part1"("id");

-- CreateIndex
CREATE INDEX "Part1Question_id_part1Id_idx" ON "Part1Question"("id", "part1Id");

-- CreateIndex
CREATE INDEX "Part2_id_idx" ON "Part2"("id");

-- CreateIndex
CREATE INDEX "Part2Question_id_part2Id_idx" ON "Part2Question"("id", "part2Id");

-- CreateIndex
CREATE INDEX "Part3_id_idx" ON "Part3"("id");

-- CreateIndex
CREATE INDEX "Part3Question_id_part3Id_idx" ON "Part3Question"("id", "part3Id");

-- CreateIndex
CREATE INDEX "MappingPart3Question_part3QuestionId_questionId_idx" ON "MappingPart3Question"("part3QuestionId", "questionId");

-- CreateIndex
CREATE INDEX "Part4_id_idx" ON "Part4"("id");

-- CreateIndex
CREATE INDEX "Part4Question_id_part4Id_idx" ON "Part4Question"("id", "part4Id");

-- CreateIndex
CREATE INDEX "MappingPart4Question_part4QuestionId_questionId_idx" ON "MappingPart4Question"("part4QuestionId", "questionId");

-- CreateIndex
CREATE INDEX "Part5_id_idx" ON "Part5"("id");

-- CreateIndex
CREATE INDEX "Part5Question_part5Id_questionId_idx" ON "Part5Question"("part5Id", "questionId");

-- CreateIndex
CREATE INDEX "Part6_id_idx" ON "Part6"("id");

-- CreateIndex
CREATE INDEX "Part6Question_id_part6Id_idx" ON "Part6Question"("id", "part6Id");

-- CreateIndex
CREATE INDEX "MappingPart6Question_questionId_part6QuestionId_idx" ON "MappingPart6Question"("questionId", "part6QuestionId");

-- CreateIndex
CREATE INDEX "Part7_id_idx" ON "Part7"("id");

-- CreateIndex
CREATE INDEX "Part7Question_id_part7Id_idx" ON "Part7Question"("id", "part7Id");

-- CreateIndex
CREATE INDEX "MappingPart7Question_part7QuestionId_questionId_idx" ON "MappingPart7Question"("part7QuestionId", "questionId");

-- CreateIndex
CREATE INDEX "Question_id_idx" ON "Question"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUser" ADD CONSTRAINT "NotificationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUser" ADD CONSTRAINT "NotificationUser_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryFeed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeFeed" ADD CONSTRAINT "LikeFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeFeed" ADD CONSTRAINT "LikeFeed_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFeed" ADD CONSTRAINT "CommentFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFeed" ADD CONSTRAINT "CommentFeed_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentFeed" ADD CONSTRAINT "ReplyCommentFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentFeed" ADD CONSTRAINT "ReplyCommentFeed_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommentFeed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part1Id_fkey" FOREIGN KEY ("part1Id") REFERENCES "Part1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part2Id_fkey" FOREIGN KEY ("part2Id") REFERENCES "Part2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part3Id_fkey" FOREIGN KEY ("part3Id") REFERENCES "Part3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part4Id_fkey" FOREIGN KEY ("part4Id") REFERENCES "Part4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part5Id_fkey" FOREIGN KEY ("part5Id") REFERENCES "Part5"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part6Id_fkey" FOREIGN KEY ("part6Id") REFERENCES "Part6"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_part7Id_fkey" FOREIGN KEY ("part7Id") REFERENCES "Part7"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeExam" ADD CONSTRAINT "LikeExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeExam" ADD CONSTRAINT "LikeExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentExam" ADD CONSTRAINT "CommentExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentExam" ADD CONSTRAINT "CommentExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentExam" ADD CONSTRAINT "ReplyCommentExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentExam" ADD CONSTRAINT "ReplyCommentExam_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommentExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1Question" ADD CONSTRAINT "Part1Question_part1Id_fkey" FOREIGN KEY ("part1Id") REFERENCES "Part1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1Question" ADD CONSTRAINT "Part1Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part2Question" ADD CONSTRAINT "Part2Question_part2Id_fkey" FOREIGN KEY ("part2Id") REFERENCES "Part2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part2Question" ADD CONSTRAINT "Part2Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part3Question" ADD CONSTRAINT "Part3Question_part3Id_fkey" FOREIGN KEY ("part3Id") REFERENCES "Part3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart3Question" ADD CONSTRAINT "MappingPart3Question_part3QuestionId_fkey" FOREIGN KEY ("part3QuestionId") REFERENCES "Part3Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart3Question" ADD CONSTRAINT "MappingPart3Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part4Question" ADD CONSTRAINT "Part4Question_part4Id_fkey" FOREIGN KEY ("part4Id") REFERENCES "Part4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart4Question" ADD CONSTRAINT "MappingPart4Question_part4QuestionId_fkey" FOREIGN KEY ("part4QuestionId") REFERENCES "Part4Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart4Question" ADD CONSTRAINT "MappingPart4Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part5Question" ADD CONSTRAINT "Part5Question_part5Id_fkey" FOREIGN KEY ("part5Id") REFERENCES "Part5"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part5Question" ADD CONSTRAINT "Part5Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part6Question" ADD CONSTRAINT "Part6Question_part6Id_fkey" FOREIGN KEY ("part6Id") REFERENCES "Part6"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart6Question" ADD CONSTRAINT "MappingPart6Question_part6QuestionId_fkey" FOREIGN KEY ("part6QuestionId") REFERENCES "Part6Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart6Question" ADD CONSTRAINT "MappingPart6Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part7Question" ADD CONSTRAINT "Part7Question_part7Id_fkey" FOREIGN KEY ("part7Id") REFERENCES "Part7"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart7Question" ADD CONSTRAINT "MappingPart7Question_part7QuestionId_fkey" FOREIGN KEY ("part7QuestionId") REFERENCES "Part7Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart7Question" ADD CONSTRAINT "MappingPart7Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
