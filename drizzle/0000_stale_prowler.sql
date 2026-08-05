CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text NOT NULL,
	`project_types` text NOT NULL,
	`description` text NOT NULL,
	`budget` text,
	`timeline` text,
	`reference` text,
	`status` text DEFAULT 'new' NOT NULL
);
