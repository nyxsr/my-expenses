PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`type` text NOT NULL,
	`transactionDate` text NOT NULL,
	`createdAt` text,
	`updatedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_expenses`("id", "name", "amount", "type", "transactionDate", "createdAt", "updatedAt") SELECT "id", "name", "amount", "type", "transactionDate", "createdAt", "updatedAt" FROM `expenses`;--> statement-breakpoint
DROP TABLE `expenses`;--> statement-breakpoint
ALTER TABLE `__new_expenses` RENAME TO `expenses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sessionToken` text NOT NULL,
	`userId` integer NOT NULL,
	`expires` integer NOT NULL,
	`createdAt` text,
	`updatedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("id", "sessionToken", "userId", "expires", "createdAt", "updatedAt") SELECT "id", "sessionToken", "userId", "expires", "createdAt", "updatedAt" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` text,
	`updatedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "password", "createdAt", "updatedAt") SELECT "id", "name", "email", "password", "createdAt", "updatedAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);