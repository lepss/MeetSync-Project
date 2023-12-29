-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 29 déc. 2023 à 09:37
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `meetsync`
--

-- --------------------------------------------------------

--
-- Structure de la table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `appointment_request_id` int(11) DEFAULT NULL,
  `appointment_session_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `appointment_requests`
--

CREATE TABLE `appointment_requests` (
  `id` int(11) NOT NULL,
  `request` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `accepted_status` varchar(255) DEFAULT 'pending',
  `user_id` int(11) DEFAULT NULL,
  `appointment_session_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `appointment_requests`
--

INSERT INTO `appointment_requests` (`id`, `request`, `created_at`, `accepted_status`, `user_id`, `appointment_session_id`) VALUES
(1, 'Request for meeting at Tech Conference', '2023-12-22 12:39:25', 'accepted', 6, 1),
(2, 'Request for discussion at Innovation Summit', '2023-12-22 12:39:25', 'pending', 7, 2);

-- --------------------------------------------------------

--
-- Structure de la table `appointment_sessions`
--

CREATE TABLE `appointment_sessions` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `event_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `appointment_sessions`
--

INSERT INTO `appointment_sessions` (`id`, `description`, `created_at`, `event_id`, `user_id`) VALUES
(1, 'Session 1 at Tech Conference', '2023-12-22 12:39:24', 1, 4),
(2, 'Session 2 at Innovation Summit', '2023-12-22 12:39:24', 2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`id`, `name`, `country`, `city`, `website`, `user_id`) VALUES
(1, 'Tech Corp', 'France', 'Paris', 'www.techcorp.com', 2),
(2, 'Innovate Ltd', 'USA', 'New York', 'www.innovate.com', 3);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `appointment_duration` int(11) DEFAULT NULL,
  `break_duration` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `event_image_url` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `appointment_duration`, `break_duration`, `created_at`, `event_image_url`, `user_id`) VALUES
(1, 'Tech Conference', 'Annual tech conference', 30, 15, '2023-12-22 12:39:24', '/events/techconference.jpg', 2),
(2, 'Innovation Summit', 'Summit for innovative ideas', 45, 10, '2023-12-22 12:39:24', '/events/innovationsummit.jpg', 3);

-- --------------------------------------------------------

--
-- Structure de la table `event_days`
--

CREATE TABLE `event_days` (
  `id` int(11) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_time` datetime DEFAULT NULL,
  `lunch_start_time` datetime DEFAULT NULL,
  `lunch_end_time` datetime DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `event_days`
--

INSERT INTO `event_days` (`id`, `start_time`, `end_time`, `lunch_start_time`, `lunch_end_time`, `event_id`) VALUES
(1, '2023-12-15 08:00:00', '2023-12-15 17:00:00', '2023-12-15 12:00:00', '2023-12-15 13:00:00', 1),
(2, '2023-12-16 09:00:00', '2023-12-16 18:00:00', '2023-12-16 13:00:00', '2023-12-16 14:00:00', 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `account_validate` tinyint(1) DEFAULT 0,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `key_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `phone`, `role`, `account_validate`, `avatar_url`, `created_at`, `key_id`) VALUES
(1, 'amiotton', 'adrien', 'miotton', 'a.miotton@gmail.com', '$2b$10$7C.SdgAajhgJmLBt9Sol0udlIX/ZpzmRGFX/sIo9zvuzwUT0.Z/BC', '0683939299', 'user', 0, 'no-pict.jpg', '2023-12-22 10:24:06', 'MTccJrmfANgKwkU9ofU2M8KM1GDzJR'),
(2, NULL, NULL, NULL, 'johndoe@example.com', '$2b$10$kJ3khy4e2L/xFy6LzEcwjeUM.9aqj9fbSPHpDE2D/FjTMpwm2Z2qK', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:07:37', 'r1I83WNY9l8yzETMDesjSFHskL2cCy'),
(3, NULL, NULL, NULL, 'janedoe@example.com', '$2b$10$dzj1v8Oxjdv18wLKV/v13u983DVdyow3YJ5eiBBw1Eqe2qqa9Mj36', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:08:02', 'eioB8wHMvKCpoGeXRiYnp1jVaTrkIE'),
(4, NULL, NULL, NULL, 'aliceblue@example.com', '$2b$10$WlokdmNmepG0F0hRTEvnvuRhQDaGs09q8sUT6HXNphsa2bz7o1HRW', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:08:22', 'nI8KAkIlKNW9ggmmVMsIvxyBOhTOcQ'),
(5, NULL, NULL, NULL, 'bobsmith@example.com', '$2b$10$lV2x6aKxhCjBw5aZTxwuK.G1KVTb7cT1fJ5/RkT/31y6z/n3xV99u', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:08:35', 'wpVeW3Jwoi1ND8vPk4Ue9HZPSiVzSj'),
(6, NULL, NULL, NULL, 'carolgreen@example.com', '$2b$10$3f1CcFuXJJgKukBEh/WRMeiSTpWKQBDYcU.U62suAP4cZqE2xjgqS', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:08:44', 'FL501J4xSGmsbgE0NqLQvYnbJREwly'),
(7, NULL, NULL, NULL, 'davebrown@example.com', '$2b$10$90YSp9xegWm/azvQZsgG2eDJ6WZf0XeRExUUZGmmfcvApRVGdKw6O', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:08:56', '5c67iKk8PDjLJw9638D92R0E4mWMab'),
(8, NULL, NULL, NULL, 'ellenwhite@example.com', '$2b$10$dtpwozjH8xr411rWMfMOhus20XlMl4L..eDlj/QLZDGNIKlDpulmG', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:09:08', '7QzrZUfh9vpahhBnd2Ml7iNinjUonL'),
(9, NULL, NULL, NULL, 'frankblack@example.com', '$2b$10$wMtTXcBJ8j9h58g4Hm7OH.iUH3FDbnGvXOI.usAJCsXttYl6x6hRe', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:09:20', 'PdYAN9XIEhjAsqtomLLZT7ecEZMAyt'),
(10, NULL, NULL, NULL, 'gracepink@example.com', '$2b$10$PwlwgM1mcyikyvXx7Cr4teVnl5NEc18S1iAemhe/mUKJ9TkguJTuq', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:09:29', '5aMo5C90zV5GU7NXc4ppj9uMcVpnow'),
(11, NULL, NULL, NULL, 'harrygrey@example.com', '$2b$10$puTCHD0pJq33dLSLZ7KdTOqmIjctpplErFuCiQ93yEbXk52Z9YE4q', NULL, 'user', 0, 'no-pict.jpg', '2023-12-22 11:09:41', 'oYehvHZNzUH93UsDgEyYEGWVszU1de');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_request_id` (`appointment_request_id`),
  ADD KEY `appointment_session_id` (`appointment_session_id`);

--
-- Index pour la table `appointment_requests`
--
ALTER TABLE `appointment_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `appointment_session_id` (`appointment_session_id`);

--
-- Index pour la table `appointment_sessions`
--
ALTER TABLE `appointment_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `event_days`
--
ALTER TABLE `event_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `appointment_requests`
--
ALTER TABLE `appointment_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `appointment_sessions`
--
ALTER TABLE `appointment_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `event_days`
--
ALTER TABLE `event_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`appointment_request_id`) REFERENCES `appointment_requests` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`appointment_session_id`) REFERENCES `appointment_sessions` (`id`);

--
-- Contraintes pour la table `appointment_requests`
--
ALTER TABLE `appointment_requests`
  ADD CONSTRAINT `appointment_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointment_requests_ibfk_2` FOREIGN KEY (`appointment_session_id`) REFERENCES `appointment_sessions` (`id`);

--
-- Contraintes pour la table `appointment_sessions`
--
ALTER TABLE `appointment_sessions`
  ADD CONSTRAINT `appointment_sessions_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `appointment_sessions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `event_days`
--
ALTER TABLE `event_days`
  ADD CONSTRAINT `event_days_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
