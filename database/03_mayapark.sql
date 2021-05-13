-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 13 mai 2021 à 17:49
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mayapark`
--

-- --------------------------------------------------------

--
-- Structure de la table `attraction`
--

CREATE TABLE `attraction` (
  `id_atr` int(4) NOT NULL COMMENT 'AUTO_INCREMENT',
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `img_url` varchar(200) NOT NULL,
  `rating` float NOT NULL,
  `ratingNbr` int(4) NOT NULL,
  `light` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `attraction`
--

INSERT INTO `attraction` (`id_atr`, `name`, `description`, `img_url`, `rating`, `ratingNbr`, `light`) VALUES
(1, 'Les montagnes de la mort', 'Les dieux sont en colères; la terre gronde, les sols tremblent et les montagnent hurlent. Fuyez, pour votre vie, fuyez!', '/assets/img/attractionPage/atr12.jpg', 0.7, 2, 0),
(2, 'Les chutes infernales', 'Déluge fréquent durant cette saison, agripez vous à ce que vous pouvez et essayer de pas vous envoler!', '/assets/img/attractionPage/atr09.jpg', 0.8, 3, 1),
(3, 'Sacrifice', 'Votre courage vous pousse à vous sacrifier aux dieux pour sauver les vêtres, mais irez vous jusqu\'au boud?', '/assets/img/attractionPage/atr14.jpg', 0.8, 3, 0),
(4, 'titre a definir', 'decription a définir', '/assets/img/attractionPage/atr01.jpg', 0.8, 1, 0),
(5, 'titre aucune idée', 'decription aucine idee', '/assets/img/attractionPage/atr02.jpg', 0.6, 3, 0);

-- --------------------------------------------------------

--
-- Structure de la table `day`
--

CREATE TABLE `day` (
  `id_day` int(4) NOT NULL COMMENT 'AUTO_INCREMENT',
  `date` date NOT NULL,
  `ticketsAvailable` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `day`
--

INSERT INTO `day` (`id_day`, `date`, `ticketsAvailable`) VALUES
(1, '2021-10-08', 199),
(2, '2021-10-09', 199),
(3, '2021-10-10', 199),
(4, '2021-11-09', 198),
(5, '2021-12-24', 191),
(6, '2021-11-26', 2),
(7, '2021-05-20', 197),
(8, '2021-12-23', 198),
(9, '2021-12-25', 198),
(10, '2021-05-14', 192),
(11, '2021-05-15', 192);

-- --------------------------------------------------------

--
-- Structure de la table `rating`
--

CREATE TABLE `rating` (
  `id_user` int(4) NOT NULL,
  `id_atr` int(4) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rating`
--

INSERT INTO `rating` (`id_user`, `id_atr`, `rating`) VALUES
(2, 1, 0.8),
(2, 2, 0.8),
(2, 3, 1),
(2, 4, 0.8),
(2, 5, 0.6),
(3, 1, 0.6),
(3, 2, 1),
(3, 5, 0.6),
(4, 2, 0.8),
(4, 3, 1),
(5, 1, 1),
(5, 2, 1),
(5, 5, 0.6);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id_user` int(4) NOT NULL,
  `id_res` int(4) NOT NULL COMMENT 'AUTO_INCREMENT',
  `startDay` date NOT NULL,
  `periode` int(3) NOT NULL,
  `state` varchar(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id_user`, `id_res`, `startDay`, `periode`, `state`, `price`) VALUES
(2, 1, '2021-10-08', 3, 'inComing', 87),
(5, 2, '2021-11-09', 1, 'inComing', 58),
(5, 3, '2021-12-24', 1, 'inComing', 116),
(6, 4, '2021-12-24', 1, 'inComing', 29);

-- --------------------------------------------------------

--
-- Structure de la table `reserve`
--

CREATE TABLE `reserve` (
  `id_res` int(11) NOT NULL,
  `id_day` int(11) NOT NULL,
  `nbrTickets` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reserve`
--

INSERT INTO `reserve` (`id_res`, `id_day`, `nbrTickets`) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(2, 4, 2),
(3, 5, 4),
(4, 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(4) NOT NULL COMMENT 'AUTO_INCREMENT',
  `type` varchar(6) NOT NULL,
  `isLog` tinyint(1) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `type`, `isLog`, `mail`, `password`, `birthday`, `firstName`, `name`) VALUES
(1, 'admin', 0, 'admin@mayapark.com', 'ADMIN!', NULL, NULL, NULL),
(2, 'user', 0, 'jeaneudes@gmail.com', '0000', '1990-01-01', 'De la cours', 'Jean Eudes'),
(3, 'user', 0, 'mailysN@gamil.com', '8888', '1996-06-22', 'Nguyene', 'Mailys'),
(4, 'user', 0, 'jaya.latika@gmail.com', '123456', '2000-11-08', 'Jaya', 'Latika'),
(5, 'user', 1, 'user@user.com', '0000', '1998-09-15', 'Perez', 'Alejandro'),
(6, 'user', 0, 'dynastie@gmail.com', 'fallon', '1992-04-22', 'Ridley', 'Liam'),
(17, 'user', 0, 'sam@gmail.com', '123456', '1990-05-26', 'Claris', 'Samantha'),
(18, 'user', 1, 'robin@user.com', 'toto', '1990-05-21', 'Christophe8', 'Robin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `attraction`
--
ALTER TABLE `attraction`
  ADD PRIMARY KEY (`id_atr`) USING BTREE;

--
-- Index pour la table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`id_day`);

--
-- Index pour la table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id_user`,`id_atr`),
  ADD KEY `id_atr` (`id_atr`,`id_user`) USING BTREE;

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_res`,`id_user`),
  ADD KEY `reservation_ibfk_1` (`id_user`);

--
-- Index pour la table `reserve`
--
ALTER TABLE `reserve`
  ADD PRIMARY KEY (`id_res`,`id_day`) USING BTREE,
  ADD KEY `id_day` (`id_day`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attraction`
--
ALTER TABLE `attraction`
  MODIFY `id_atr` int(4) NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `day`
--
ALTER TABLE `day`
  MODIFY `id_day` int(4) NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT', AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_res` int(4) NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(4) NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT', AUTO_INCREMENT=35;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`id_atr`) REFERENCES `attraction` (`id_atr`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `reserve`
--
ALTER TABLE `reserve`
  ADD CONSTRAINT `reserve_ibfk_1` FOREIGN KEY (`id_day`) REFERENCES `day` (`id_day`),
  ADD CONSTRAINT `reserve_ibfk_2` FOREIGN KEY (`id_res`) REFERENCES `reservation` (`id_res`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
