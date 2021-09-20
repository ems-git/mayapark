

CREATE TABLE `attraction` (
  `id_atr` int(4) PRIMARY KEY NOT NULL 'AUTO_INCREMENT',
  `name` varchar(150) NOT NULL,
  `description` text(1500) NOT NULL,
  `img_url` varchar(250) NOT NULL,
  `rating` float(3) NOT NULL,
  `ratingNbr` int(6) NOT NULL,
  `light` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `day` (
  `id_day` int(4) PRIMARY KEY NOT NULL 'AUTO_INCREMENT',
  `date` date NOT NULL,
  `ticketsAvailable` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `rating` (
  `id_user` int(4) NOT NULL FOREIGN KEY REFERENCES `user` (`id_user`),
  `id_atr` int(4) NOT NULL FOREIGN KEY REFERENCES `attraction` (`id_atr`),
  `rating` float(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reservation` (
  `id_res` int(4) PRIMARY KEY NOT NULL 'AUTO_INCREMENT',
  `id_user` int(4) NOT NULL FOREIGN KEY REFERENCES `user` (`id_user`),
  `startDay` date NOT NULL,
  `periode` int(3) NOT NULL,
  `tickets` varchar(2) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reserve` (
  `id_res` int(4) NOT NULL FOREIGN KEY REFERENCES `reservation` (`id_res`),
  `id_day` int(4) NOT NULL FOREIGN KEY REFERENCES `day` (`id_day`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id_user` int(5) PRIMARY KEY NOT NULL 'AUTO_INCREMENT',
  `type` varchar(6) NOT NULL,
  `isLog` tinyint(1) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


