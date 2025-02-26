-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2025 at 06:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ohs`
--

-- --------------------------------------------------------

--
-- Table structure for table `acc_tb`
--

CREATE TABLE `acc_tb` (
  `u_id` int(11) NOT NULL,
  `u_username` varchar(50) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  `u_password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `acc_tb`
--

INSERT INTO `acc_tb` (`u_id`, `u_username`, `u_email`, `u_password`) VALUES
(1, '', '123', '123@gmail.com'),
(2, '', '1@gmail.com', 'asd'),
(3, 'username', '$2b$10$6y6S7WnPotUG/Evvt8i8Nu94lUgoumfveqC1VDi.Nco', 'email@gmail.com'),
(4, 'username', 'email@gmail.com', '$2b$10$Fcem9zPSjkZl/pIZPLBRWuOZkIk2K6sPYccz51W4l2SbPeW2yZFze');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acc_tb`
--
ALTER TABLE `acc_tb`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acc_tb`
--
ALTER TABLE `acc_tb`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
