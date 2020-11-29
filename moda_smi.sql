-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 29, 2020 at 02:39 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moda_smi`
--

-- --------------------------------------------------------

--
-- Table structure for table `variables`
--

CREATE TABLE `variables` (
  `id_variables` int(12) NOT NULL,
  `variable_description` text NOT NULL,
  `variable_key` varchar(100) NOT NULL,
  `variable_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `variables`
--

INSERT INTO `variables` (`id_variables`, `variable_description`, `variable_key`, `variable_value`) VALUES
(1, 'Base URL Projects', 'baseUrl', 'http://localhost:8080/'),
(2, 'Config JSON for Firebase', 'firebaseConfig', '{\"apiKey\": \"AIzaSyBjoZcWALEFrYre7Rhyf-SUij4CHDZdLPc\",\"authDomain\": \"active-cable-292807.firebaseapp.com\",\"databaseURL\": \"https://active-cable-292807.firebaseio.com\",\"projectId\": \"active-cable-292807\",\"storageBucket\": \"active-cable-292807.appspot.com\",\"messagingSenderId\": \"652427792787\",\"appId\": \"1:652427792787:web:4201de95b59aebbf0e1866\",\"measurementId\": \"G-VSP8BR8993\"}'),
(3, 'firebaseURL Rest API', 'firebaseRestAPI_URL', 'https://firestore.googleapis.com/v1/projects/active-cable-292807/');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `variables`
--
ALTER TABLE `variables`
  ADD PRIMARY KEY (`id_variables`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `variables`
--
ALTER TABLE `variables`
  MODIFY `id_variables` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
