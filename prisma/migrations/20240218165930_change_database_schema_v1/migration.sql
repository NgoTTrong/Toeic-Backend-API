/*
  Warnings:

  - The primary key for the `CommentExam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CommentFeed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Exam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Feed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LikeExam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LikeFeed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MappingPart3Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `MappingPart3Question` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MappingPart3Question` table. All the data in the column will be lost.
  - The primary key for the `MappingPart4Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `MappingPart4Question` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MappingPart4Question` table. All the data in the column will be lost.
  - The primary key for the `MappingPart6Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `MappingPart6Question` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MappingPart6Question` table. All the data in the column will be lost.
  - The primary key for the `MappingPart7Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `MappingPart7Question` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MappingPart7Question` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `NotificationUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part1` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part1Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part2` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part2Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part3` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part3Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part4` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part4Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part5` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part5Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part6` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part6Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part7` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Part7Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Rank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CategoryExam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryFeed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyCommentExam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyCommentFeed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[topicId]` on the table `Part1Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part1Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId]` on the table `Part2Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part2Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId]` on the table `Part3Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part3Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId]` on the table `Part4Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part4Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId]` on the table `Part5Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part5Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId]` on the table `Part6Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part6Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId]` on the table `Part7Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[explainId]` on the table `Part7Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `duration` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfParts` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Part2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfQuestions` to the `Part2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Part3` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfQuestions` to the `Part3` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Part4` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfQuestions` to the `Part4` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Part5` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfQuestions` to the `Part5` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Part6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfQuestions` to the `Part6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `Part7` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfQuestions` to the `Part7` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Active" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "CommentExam" DROP CONSTRAINT "CommentExam_examId_fkey";

-- DropForeignKey
ALTER TABLE "CommentExam" DROP CONSTRAINT "CommentExam_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentFeed" DROP CONSTRAINT "CommentFeed_feedId_fkey";

-- DropForeignKey
ALTER TABLE "CommentFeed" DROP CONSTRAINT "CommentFeed_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part1Id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part2Id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part3Id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part4Id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part5Id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part6Id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_part7Id_fkey";

-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "LikeExam" DROP CONSTRAINT "LikeExam_examId_fkey";

-- DropForeignKey
ALTER TABLE "LikeExam" DROP CONSTRAINT "LikeExam_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikeFeed" DROP CONSTRAINT "LikeFeed_feedId_fkey";

-- DropForeignKey
ALTER TABLE "LikeFeed" DROP CONSTRAINT "LikeFeed_userId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart3Question" DROP CONSTRAINT "MappingPart3Question_part3QuestionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart3Question" DROP CONSTRAINT "MappingPart3Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart4Question" DROP CONSTRAINT "MappingPart4Question_part4QuestionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart4Question" DROP CONSTRAINT "MappingPart4Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart6Question" DROP CONSTRAINT "MappingPart6Question_part6QuestionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart6Question" DROP CONSTRAINT "MappingPart6Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart7Question" DROP CONSTRAINT "MappingPart7Question_part7QuestionId_fkey";

-- DropForeignKey
ALTER TABLE "MappingPart7Question" DROP CONSTRAINT "MappingPart7Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationUser" DROP CONSTRAINT "NotificationUser_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationUser" DROP CONSTRAINT "NotificationUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Part1Question" DROP CONSTRAINT "Part1Question_part1Id_fkey";

-- DropForeignKey
ALTER TABLE "Part1Question" DROP CONSTRAINT "Part1Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Part2Question" DROP CONSTRAINT "Part2Question_part2Id_fkey";

-- DropForeignKey
ALTER TABLE "Part2Question" DROP CONSTRAINT "Part2Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Part3Question" DROP CONSTRAINT "Part3Question_part3Id_fkey";

-- DropForeignKey
ALTER TABLE "Part4Question" DROP CONSTRAINT "Part4Question_part4Id_fkey";

-- DropForeignKey
ALTER TABLE "Part5Question" DROP CONSTRAINT "Part5Question_part5Id_fkey";

-- DropForeignKey
ALTER TABLE "Part5Question" DROP CONSTRAINT "Part5Question_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Part6Question" DROP CONSTRAINT "Part6Question_part6Id_fkey";

-- DropForeignKey
ALTER TABLE "Part7Question" DROP CONSTRAINT "Part7Question_part7Id_fkey";

-- DropForeignKey
ALTER TABLE "ReplyCommentExam" DROP CONSTRAINT "ReplyCommentExam_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyCommentExam" DROP CONSTRAINT "ReplyCommentExam_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyCommentFeed" DROP CONSTRAINT "ReplyCommentFeed_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyCommentFeed" DROP CONSTRAINT "ReplyCommentFeed_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rankId_fkey";

-- DropIndex
DROP INDEX "CommentExam_userId_examId_idx";

-- DropIndex
DROP INDEX "CommentFeed_userId_feedId_idx";

-- DropIndex
DROP INDEX "LikeExam_userId_examId_idx";

-- DropIndex
DROP INDEX "LikeFeed_userId_feedId_idx";

-- DropIndex
DROP INDEX "NotificationUser_id_userId_idx";

-- AlterTable
ALTER TABLE "CommentExam" DROP CONSTRAINT "CommentExam_pkey",
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "examId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CommentExam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CommentExam_id_seq";

-- AlterTable
ALTER TABLE "CommentFeed" DROP CONSTRAINT "CommentFeed_pkey",
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "feedId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CommentFeed_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CommentFeed_id_seq";

-- AlterTable
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_pkey",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfParts" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ALTER COLUMN "part1Id" SET DATA TYPE TEXT,
ALTER COLUMN "part2Id" SET DATA TYPE TEXT,
ALTER COLUMN "part3Id" SET DATA TYPE TEXT,
ALTER COLUMN "part4Id" SET DATA TYPE TEXT,
ALTER COLUMN "part5Id" SET DATA TYPE TEXT,
ALTER COLUMN "part6Id" SET DATA TYPE TEXT,
ALTER COLUMN "part7Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exam_id_seq";

-- AlterTable
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_pkey",
ADD COLUMN     "active" "Active" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feed_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Feed_id_seq";

-- AlterTable
ALTER TABLE "LikeExam" DROP CONSTRAINT "LikeExam_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "examId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LikeExam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LikeExam_id_seq";

-- AlterTable
ALTER TABLE "LikeFeed" DROP CONSTRAINT "LikeFeed_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "feedId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LikeFeed_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LikeFeed_id_seq";

-- AlterTable
ALTER TABLE "MappingPart3Question" DROP CONSTRAINT "MappingPart3Question_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ALTER COLUMN "part3QuestionId" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MappingPart3Question_pkey" PRIMARY KEY ("part3QuestionId", "questionId");

-- AlterTable
ALTER TABLE "MappingPart4Question" DROP CONSTRAINT "MappingPart4Question_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ALTER COLUMN "part4QuestionId" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MappingPart4Question_pkey" PRIMARY KEY ("questionId", "part4QuestionId");

-- AlterTable
ALTER TABLE "MappingPart6Question" DROP CONSTRAINT "MappingPart6Question_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ALTER COLUMN "part6QuestionId" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MappingPart6Question_pkey" PRIMARY KEY ("part6QuestionId", "questionId");

-- AlterTable
ALTER TABLE "MappingPart7Question" DROP CONSTRAINT "MappingPart7Question_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ALTER COLUMN "part7QuestionId" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MappingPart7Question_pkey" PRIMARY KEY ("part7QuestionId", "questionId");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notification_id_seq";

-- AlterTable
ALTER TABLE "NotificationUser" DROP CONSTRAINT "NotificationUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "notificationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "NotificationUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "NotificationUser_id_seq";

-- AlterTable
ALTER TABLE "Part1" DROP CONSTRAINT "Part1_pkey",
ADD COLUMN     "creatorId" TEXT,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT,
ADD COLUMN     "numOfQuestions" INTEGER,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "thumbnail" DROP NOT NULL,
ADD CONSTRAINT "Part1_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part1_id_seq";

-- AlterTable
ALTER TABLE "Part1Question" DROP CONSTRAINT "Part1Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ALTER COLUMN "part1Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part1Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part1Question_id_seq";

-- AlterTable
ALTER TABLE "Part2" DROP CONSTRAINT "Part2_pkey",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part2_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part2_id_seq";

-- AlterTable
ALTER TABLE "Part2Question" DROP CONSTRAINT "Part2Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ALTER COLUMN "part2Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part2Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part2Question_id_seq";

-- AlterTable
ALTER TABLE "Part3" DROP CONSTRAINT "Part3_pkey",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part3_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part3_id_seq";

-- AlterTable
ALTER TABLE "Part3Question" DROP CONSTRAINT "Part3Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "part3Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part3Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part3Question_id_seq";

-- AlterTable
ALTER TABLE "Part4" DROP CONSTRAINT "Part4_pkey",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part4_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part4_id_seq";

-- AlterTable
ALTER TABLE "Part4Question" DROP CONSTRAINT "Part4Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "part4Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part4Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part4Question_id_seq";

-- AlterTable
ALTER TABLE "Part5" DROP CONSTRAINT "Part5_pkey",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part5_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part5_id_seq";

-- AlterTable
ALTER TABLE "Part5Question" DROP CONSTRAINT "Part5Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "part5Id" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part5Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part5Question_id_seq";

-- AlterTable
ALTER TABLE "Part6" DROP CONSTRAINT "Part6_pkey",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part6_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part6_id_seq";

-- AlterTable
ALTER TABLE "Part6Question" DROP CONSTRAINT "Part6Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "part6Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part6Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part6Question_id_seq";

-- AlterTable
ALTER TABLE "Part7" DROP CONSTRAINT "Part7_pkey",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "introduction" TEXT NOT NULL,
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part7_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part7_id_seq";

-- AlterTable
ALTER TABLE "Part7Question" DROP CONSTRAINT "Part7Question_pkey",
ADD COLUMN     "explainId" TEXT,
ADD COLUMN     "topicId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "part7Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Part7Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Part7Question_id_seq";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "answer",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Question_id_seq";

-- AlterTable
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rank_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rank_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "password",
ADD COLUMN     "active" "Active" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "address" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "rankId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "CategoryExam";

-- DropTable
DROP TABLE "CategoryFeed";

-- DropTable
DROP TABLE "ReplyCommentExam";

-- DropTable
DROP TABLE "ReplyCommentFeed";

-- DropTable
DROP TABLE "Staff";

-- CreateTable
CREATE TABLE "FeedCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "FeedCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeCommentFeed" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LikeCommentFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "ExamCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeCommentExam" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LikeCommentExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Explain" (
    "id" TEXT NOT NULL,
    "explain" TEXT NOT NULL,
    "images" TEXT[],
    "answer" "Answer" NOT NULL,

    CONSTRAINT "Explain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "price" DOUBLE PRECISION,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "position" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "chapterId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeedCategory_id_idx" ON "FeedCategory"("id");

-- CreateIndex
CREATE INDEX "ExamCategory_id_idx" ON "ExamCategory"("id");

-- CreateIndex
CREATE INDEX "Topic_id_idx" ON "Topic"("id");

-- CreateIndex
CREATE INDEX "Explain_id_idx" ON "Explain"("id");

-- CreateIndex
CREATE INDEX "Course_categoryId_idx" ON "Course"("categoryId");

-- CreateIndex
CREATE INDEX "Attachment_courseId_idx" ON "Attachment"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_name_key" ON "CourseCategory"("name");

-- CreateIndex
CREATE INDEX "Chapter_courseId_idx" ON "Chapter"("courseId");

-- CreateIndex
CREATE INDEX "Payment_courseId_idx" ON "Payment"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userId_courseId_key" ON "Payment"("userId", "courseId");

-- CreateIndex
CREATE INDEX "UserProgress_chapterId_idx" ON "UserProgress"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_chapterId_key" ON "UserProgress"("userId", "chapterId");

-- CreateIndex
CREATE INDEX "CommentExam_examId_idx" ON "CommentExam"("examId");

-- CreateIndex
CREATE INDEX "CommentFeed_feedId_idx" ON "CommentFeed"("feedId");

-- CreateIndex
CREATE INDEX "CommentFeed_parentId_idx" ON "CommentFeed"("parentId");

-- CreateIndex
CREATE INDEX "LikeExam_examId_idx" ON "LikeExam"("examId");

-- CreateIndex
CREATE INDEX "LikeFeed_feedId_idx" ON "LikeFeed"("feedId");

-- CreateIndex
CREATE INDEX "NotificationUser_id_idx" ON "NotificationUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Part1Question_topicId_key" ON "Part1Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part1Question_explainId_key" ON "Part1Question"("explainId");

-- CreateIndex
CREATE UNIQUE INDEX "Part2Question_topicId_key" ON "Part2Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part2Question_explainId_key" ON "Part2Question"("explainId");

-- CreateIndex
CREATE UNIQUE INDEX "Part3Question_topicId_key" ON "Part3Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part3Question_explainId_key" ON "Part3Question"("explainId");

-- CreateIndex
CREATE UNIQUE INDEX "Part4Question_topicId_key" ON "Part4Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part4Question_explainId_key" ON "Part4Question"("explainId");

-- CreateIndex
CREATE UNIQUE INDEX "Part5Question_topicId_key" ON "Part5Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part5Question_explainId_key" ON "Part5Question"("explainId");

-- CreateIndex
CREATE UNIQUE INDEX "Part6Question_topicId_key" ON "Part6Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part6Question_explainId_key" ON "Part6Question"("explainId");

-- CreateIndex
CREATE UNIQUE INDEX "Part7Question_topicId_key" ON "Part7Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Part7Question_explainId_key" ON "Part7Question"("explainId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUser" ADD CONSTRAINT "NotificationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUser" ADD CONSTRAINT "NotificationUser_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FeedCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeFeed" ADD CONSTRAINT "LikeFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeFeed" ADD CONSTRAINT "LikeFeed_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFeed" ADD CONSTRAINT "CommentFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFeed" ADD CONSTRAINT "CommentFeed_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFeed" ADD CONSTRAINT "CommentFeed_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CommentFeed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeCommentFeed" ADD CONSTRAINT "LikeCommentFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeCommentFeed" ADD CONSTRAINT "LikeCommentFeed_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommentFeed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExamCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "LikeExam" ADD CONSTRAINT "LikeExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeExam" ADD CONSTRAINT "LikeExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentExam" ADD CONSTRAINT "CommentExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentExam" ADD CONSTRAINT "CommentExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentExam" ADD CONSTRAINT "CommentExam_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CommentExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeCommentExam" ADD CONSTRAINT "LikeCommentExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeCommentExam" ADD CONSTRAINT "LikeCommentExam_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommentExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1" ADD CONSTRAINT "Part1_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1Question" ADD CONSTRAINT "Part1Question_part1Id_fkey" FOREIGN KEY ("part1Id") REFERENCES "Part1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1Question" ADD CONSTRAINT "Part1Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1Question" ADD CONSTRAINT "Part1Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part1Question" ADD CONSTRAINT "Part1Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part2Question" ADD CONSTRAINT "Part2Question_part2Id_fkey" FOREIGN KEY ("part2Id") REFERENCES "Part2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part2Question" ADD CONSTRAINT "Part2Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part2Question" ADD CONSTRAINT "Part2Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part2Question" ADD CONSTRAINT "Part2Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part3Question" ADD CONSTRAINT "Part3Question_part3Id_fkey" FOREIGN KEY ("part3Id") REFERENCES "Part3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part3Question" ADD CONSTRAINT "Part3Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part3Question" ADD CONSTRAINT "Part3Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart3Question" ADD CONSTRAINT "MappingPart3Question_part3QuestionId_fkey" FOREIGN KEY ("part3QuestionId") REFERENCES "Part3Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart3Question" ADD CONSTRAINT "MappingPart3Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part4Question" ADD CONSTRAINT "Part4Question_part4Id_fkey" FOREIGN KEY ("part4Id") REFERENCES "Part4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part4Question" ADD CONSTRAINT "Part4Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part4Question" ADD CONSTRAINT "Part4Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart4Question" ADD CONSTRAINT "MappingPart4Question_part4QuestionId_fkey" FOREIGN KEY ("part4QuestionId") REFERENCES "Part4Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart4Question" ADD CONSTRAINT "MappingPart4Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part5Question" ADD CONSTRAINT "Part5Question_part5Id_fkey" FOREIGN KEY ("part5Id") REFERENCES "Part5"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part5Question" ADD CONSTRAINT "Part5Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part5Question" ADD CONSTRAINT "Part5Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part5Question" ADD CONSTRAINT "Part5Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part6Question" ADD CONSTRAINT "Part6Question_part6Id_fkey" FOREIGN KEY ("part6Id") REFERENCES "Part6"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part6Question" ADD CONSTRAINT "Part6Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part6Question" ADD CONSTRAINT "Part6Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart6Question" ADD CONSTRAINT "MappingPart6Question_part6QuestionId_fkey" FOREIGN KEY ("part6QuestionId") REFERENCES "Part6Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart6Question" ADD CONSTRAINT "MappingPart6Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part7Question" ADD CONSTRAINT "Part7Question_part7Id_fkey" FOREIGN KEY ("part7Id") REFERENCES "Part7"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part7Question" ADD CONSTRAINT "Part7Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part7Question" ADD CONSTRAINT "Part7Question_explainId_fkey" FOREIGN KEY ("explainId") REFERENCES "Explain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart7Question" ADD CONSTRAINT "MappingPart7Question_part7QuestionId_fkey" FOREIGN KEY ("part7QuestionId") REFERENCES "Part7Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingPart7Question" ADD CONSTRAINT "MappingPart7Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
