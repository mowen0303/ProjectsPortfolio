-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-10 18:22:45
-- 服务器版本： 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itec4020`
--
CREATE DATABASE IF NOT EXISTS `itec4020` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `itec4020`;

-- --------------------------------------------------------

--
-- 表的结构 `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chat_message` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `chat`
--

INSERT INTO `chat` (`chat_id`, `user_id`, `chat_message`) VALUES
(1, 1, 'Hello, how are you doing'),
(2, 2, 'Good, thank you!'),
(17, 3, 'I am good too!');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_category_id` int(11) NOT NULL,
  `user_name` varchar(60) NOT NULL,
  `user_password` varchar(60) NOT NULL,
  `avatar` varchar(10) NOT NULL,
  `des` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `user_category_id`, `user_name`, `user_password`, `avatar`, `des`) VALUES
(1, 1, 'admin', '670b14728ad9902aecba32e22fa4f6bd', 'u1.jpg', 'HELLO'),
(2, 2, 'Jerry', '670b14728ad9902aecba32e22fa4f6bd', 'u2.jpg', 'I am jerry'),
(3, 2, 'Allen', '670b14728ad9902aecba32e22fa4f6bd', 'u3.jpg', 'I am Allen'),
(4, 2, 'Dennis', '670b14728ad9902aecba32e22fa4f6bd', 'u4.jpg', 'I am Dennis'),
(5, 2, 'Eva', '670b14728ad9902aecba32e22fa4f6bd', 'u5.jpg', 'I am Eva'),
(6, 2, 'Effy', '670b14728ad9902aecba32e22fa4f6bd', 'u6.jpg', 'I am Effy');

-- --------------------------------------------------------

--
-- 表的结构 `user_category`
--

CREATE TABLE `user_category` (
  `user_category_id` int(11) NOT NULL,
  `user_category_title` varchar(60) NOT NULL,
  `user_category_authority` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_category`
--

INSERT INTO `user_category` (`user_category_id`, `user_category_title`, `user_category_authority`) VALUES
(1, 'Admin', 15),
(2, 'Normal', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_category`
--
ALTER TABLE `user_category`
  ADD PRIMARY KEY (`user_category_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `user_category`
--
ALTER TABLE `user_category`
  MODIFY `user_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
