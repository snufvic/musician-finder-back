-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2022 at 11:31 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musician_finder_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id`, `name`) VALUES
(1, 'North'),
(2, 'Haifa'),
(3, 'Tel-Aviv'),
(4, 'Center'),
(5, 'Jerusalem'),
(15, 'South'),
(16, 'Hadera');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `m_id` int(11) NOT NULL,
  `favorite_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`m_id`, `favorite_id`) VALUES
(2, 2),
(2, 1),
(2, 14),
(3, 1),
(3, 7),
(3, 3),
(7, 1),
(7, 3),
(14, 1),
(14, 13),
(16, 1),
(16, 13),
(16, 14),
(13, 1),
(13, 2),
(13, 14),
(1, 2),
(14, 16),
(14, 2),
(1, 1),
(1, 14),
(14, 14),
(1, 16),
(1, 13),
(1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `instruments`
--

CREATE TABLE `instruments` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instruments`
--

INSERT INTO `instruments` (`id`, `name`) VALUES
(1, 'Electric guitar'),
(2, 'Piano'),
(3, 'Bass guitar'),
(4, 'Drums'),
(7, 'Celo'),
(28, 'Ukulele'),
(32, 'Trumpet'),
(33, 'Keyboards'),
(35, 'Singer'),
(36, 'Flute'),
(38, 'Violin');

-- --------------------------------------------------------

--
-- Table structure for table `musicians`
--

CREATE TABLE `musicians` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `age` varchar(3) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `profileImage` varchar(1024) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access_level` int(1) NOT NULL,
  `is_card` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `musicians`
--

INSERT INTO `musicians` (`id`, `first_name`, `last_name`, `age`, `email`, `phone`, `profileImage`, `password`, `access_level`, `is_card`) VALUES
(1, 'Amit', 'Wicnudel', '42', 'amit@gmail.com', '0525757870', '/profileImages/musician_1.JPG', '$2b$10$1SXOdaJnOli1MmagCy//COckw29YhSMuGr.rLPVuYkISHxXkkJFEy', 1, 1),
(2, 'Kinga', 'Glyk', '25', 'kinga@gmail.com', '0544613797', '/profileImages/musician_2.webp', '$2b$10$v3r2pe7dr8phl7mR/3Gyi.mWEePe/u6Iqryg6/.Hpj5/k5XmzpI5a', 1, 1),
(3, 'Abi', 'Wic', '11', 'abi@gmail.com', '054444444', '/profileImages/default.webp', '$2b$10$2jsBvLZAsxaW8v94vFXNVObIVF4pl6lch4HtGWShjWqc8DaoSM7pe', 2, 1),
(7, 'Kinga', 'Przewloka', '44', 'queenga26@gmail.com', '0544613797', '/profileImages/default.webp', '$2b$10$kxWSqqhUBYcdG/IM99tQZuDoZa/jPGyj5SWQ.57PsL.fpXNV/bfMy', 2, 1),
(9, 'cc', 'cc', '12', 'c@c.com', '0523456789', '/profileImages/musician_9.png', '$2b$10$7AzUwUaZics4jj8sULPvnez4TZydccwBn5B9.4hLXg36ffYPc22se', 2, 1),
(13, 'Carter', 'Beuford', '54', 'carter@dmb.com', '0545664488', '/profileImages/musician_13.jpg', '$2b$10$/viOiL/XYCoKbLwD5qb/a.FxnYi/thDNtp80iEtyLezqLNc8ga.FO', 2, 1),
(14, 'Flea', 'Balzari', '59', 'flea@rhcp.com', '055874445', '/profileImages/musician_14.jpg', '$2b$10$3TDs1GMLkx324WPpeUHahuVPnFaHY7sYzRnK7ox0TJwfwE9Au/73q', 1, 1),
(16, 'Cory', 'Wong', '37', 'cory@ff.com', '055556665', '/profileImages/musician_16.jpg', '$2b$10$VVKiOETaP/EjrjG/FhlCPeYA6oz2BoAr37nWwZScU5YS9kox.b/bi', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `musician_district`
--

CREATE TABLE `musician_district` (
  `m_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `musician_district`
--

INSERT INTO `musician_district` (`m_id`, `id`) VALUES
(7, 2),
(3, 5),
(3, 4),
(3, 3),
(3, 2),
(3, 1),
(13, 3),
(13, 4),
(16, 5),
(16, 3),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(9, 5),
(14, 2),
(14, 4),
(14, 3),
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `musician_instrument`
--

CREATE TABLE `musician_instrument` (
  `m_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `musician_instrument`
--

INSERT INTO `musician_instrument` (`m_id`, `id`) VALUES
(7, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 7),
(13, 4),
(16, 3),
(16, 1),
(16, 2),
(2, 3),
(9, 7),
(9, 2),
(14, 3),
(1, 1),
(1, 3),
(1, 28);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD KEY `m_id` (`m_id`),
  ADD KEY `favorite_id` (`favorite_id`);

--
-- Indexes for table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `musicians`
--
ALTER TABLE `musicians`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `musician_district`
--
ALTER TABLE `musician_district`
  ADD KEY `id` (`id`),
  ADD KEY `m_id` (`m_id`);

--
-- Indexes for table `musician_instrument`
--
ALTER TABLE `musician_instrument`
  ADD KEY `foreign1` (`id`),
  ADD KEY `foreign2` (`m_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `musicians`
--
ALTER TABLE `musicians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `musicians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`favorite_id`) REFERENCES `musicians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `musician_district`
--
ALTER TABLE `musician_district`
  ADD CONSTRAINT `musician_district_ibfk_1` FOREIGN KEY (`id`) REFERENCES `district` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `musician_district_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `musicians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `musician_instrument`
--
ALTER TABLE `musician_instrument`
  ADD CONSTRAINT `foreign1` FOREIGN KEY (`id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign2` FOREIGN KEY (`m_id`) REFERENCES `musicians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
