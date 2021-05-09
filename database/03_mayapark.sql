-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 07 mai 2021 à 16:16
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
(5, '2021-12-24', 195);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`id_day`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `day`
--
ALTER TABLE `day`
  MODIFY `id_day` int(4) NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT', AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
