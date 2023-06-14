-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2020 at 05:02 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mentorski`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_group`
--

INSERT INTO `auth_group` (`id`, `name`) VALUES
(1, 'mentor'),
(2, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_group_permissions`
--

INSERT INTO `auth_group_permissions` (`id`, `group_id`, `permission_id`) VALUES
(2, 1, 17),
(3, 1, 24),
(4, 1, 25),
(5, 1, 26),
(6, 1, 27),
(7, 1, 28),
(8, 1, 30),
(1, 1, 32),
(10, 2, 17),
(11, 2, 25),
(12, 2, 26),
(13, 2, 27),
(14, 2, 28),
(15, 2, 29),
(16, 2, 30),
(9, 2, 32);

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_korisnici'),
(22, 'Can change user', 6, 'change_korisnici'),
(23, 'Can delete user', 6, 'delete_korisnici'),
(24, 'Can view user', 6, 'view_korisnici'),
(25, 'Can add predmeti', 7, 'add_predmeti'),
(26, 'Can change predmeti', 7, 'change_predmeti'),
(27, 'Can delete predmeti', 7, 'delete_predmeti'),
(28, 'Can view predmeti', 7, 'view_predmeti'),
(29, 'Can add upisi', 8, 'add_upisi'),
(30, 'Can change upisi', 8, 'change_upisi'),
(31, 'Can delete upisi', 8, 'delete_upisi'),
(32, 'Can view upisi', 8, 'view_upisi');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(27, '2020-08-26 22:16:33.595704', '10', 'student izvanredni', 3, '', 6, 1),
(28, '2020-08-26 22:16:33.712708', '8', 'student redovni', 3, '', 6, 1),
(29, '2020-08-26 22:16:33.806716', '7', 'student redovni', 3, '', 6, 1),
(30, '2020-08-26 22:16:34.033734', '9', 'student redovni', 3, '', 6, 1),
(31, '2020-08-26 22:16:34.078736', '11', 'student izvanredni', 3, '', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(6, 'myapp', 'korisnici'),
(7, 'myapp', 'predmeti'),
(8, 'myapp', 'upisi'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2020-08-22 11:26:19.163279'),
(2, 'contenttypes', '0002_remove_content_type_name', '2020-08-22 11:26:20.141334'),
(3, 'auth', '0001_initial', '2020-08-22 11:26:21.890352'),
(4, 'auth', '0002_alter_permission_name_max_length', '2020-08-22 11:26:27.833783'),
(5, 'auth', '0003_alter_user_email_max_length', '2020-08-22 11:26:27.957792'),
(6, 'auth', '0004_alter_user_username_opts', '2020-08-22 11:26:28.078797'),
(7, 'auth', '0005_alter_user_last_login_null', '2020-08-22 11:26:28.155805'),
(8, 'auth', '0006_require_contenttypes_0002', '2020-08-22 11:26:28.207803'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2020-08-22 11:26:28.313149'),
(10, 'auth', '0008_alter_user_username_max_length', '2020-08-22 11:26:28.392129'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2020-08-22 11:26:28.467157'),
(12, 'auth', '0010_alter_group_name_max_length', '2020-08-22 11:26:28.641455'),
(13, 'auth', '0011_update_proxy_permissions', '2020-08-22 11:26:28.729449'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2020-08-22 11:26:28.812454'),
(15, 'myapp', '0001_initial', '2020-08-22 11:26:30.644611'),
(16, 'admin', '0001_initial', '2020-08-22 11:26:44.479013'),
(17, 'admin', '0002_logentry_remove_auto_add', '2020-08-22 11:26:49.522148'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2020-08-22 11:26:49.733631'),
(19, 'sessions', '0001_initial', '2020-08-22 11:26:51.272703'),
(20, 'myapp', '0002_auto_20200822_1329', '2020-08-22 11:29:57.467129'),
(21, 'myapp', '0003_auto_20200822_1347', '2020-08-22 11:47:39.587862'),
(22, 'myapp', '0004_auto_20200822_1504', '2020-08-22 13:04:13.339785'),
(23, 'myapp', '0005_auto_20200823_1154', '2020-08-23 09:54:36.856326'),
(24, 'myapp', '0006_auto_20200823_1348', '2020-08-23 11:49:03.687972');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('4p15wv4r7braqeen5urt3uixiq5sp2eb', 'e30:1kAxPD:u_pUlp3VIYOB-6h-9x4Vhl7JJNGfWcibEZbg6sv7_7Q', '2020-09-09 15:32:07.631089'),
('mp4gx3fpyr88mlndtf66mkwgem80y5lm', 'e30:1kAxT7:wM9pNKibhbdOcMnm5LB58aZMI94qXCmuXZNtAFbg4JM', '2020-09-09 15:36:09.515573'),
('qv85jm3vfiijnctgdaewfy0geujcpgq5', 'e30:1kAGok:0j-L3B21h9jug5yS2QZTxN52a-IlV-dfLbwQdhRq-Xk', '2020-09-07 18:03:38.019496');

-- --------------------------------------------------------

--
-- Table structure for table `myapp_korisnici`
--

CREATE TABLE `myapp_korisnici` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(150) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `myapp_korisnici`
--

INSERT INTO `myapp_korisnici` (`id`, `password`, `last_login`, `is_superuser`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `role`, `username`, `status`) VALUES
(1, 'pbkdf2_sha256$216000$ttQZ9Bn4aUCH$GpJzG8GsYhmJlOPnPi7fKNMSIIAfELsyGHH6mdnQbIw=', '2020-08-27 14:37:57.518300', 1, '', '', 'mentor@oss.hr', 1, 1, '2020-08-22 11:49:06.000000', 'mentor', 'mentor@oss.hr', 'none'),
(2, 'pbkdf2_sha256$216000$F0uSSaVfMf32$Fdn/y8ezK9I/lB/CEEtTOpZjegQ66I9sW5t0Gz5BXbg=', '2020-08-27 12:30:37.146472', 0, '', '', 'red@oss.hr', 1, 1, '2020-08-22 11:45:42.000000', 'student', 'red@oss.hr', 'redovni'),
(3, 'pbkdf2_sha256$216000$i7vbj8TpqkUx$H0BetlEasrUKu9Mq0RppElSJjbgCCPOOKjL8R94rVC0=', '2020-08-24 18:06:35.000000', 0, '', '', 'izv@oss.hr', 1, 1, '2020-08-22 11:48:33.000000', 'student', 'izv@oss.hr', 'izvanredni'),
(12, 'pbkdf2_sha256$216000$AwyHLUGaWD6W$yE3daNf8CA+E7hr9+UDydMJ0CeY1SpRnn6o6ugPRM04=', '2020-08-27 14:50:18.929500', 0, '', '', '', 0, 1, '2020-08-27 14:38:42.959769', 'student', 'katarina@oss.hr', 'redovni');

-- --------------------------------------------------------

--
-- Table structure for table `myapp_korisnici_groups`
--

CREATE TABLE `myapp_korisnici_groups` (
  `id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `myapp_korisnici_groups`
--

INSERT INTO `myapp_korisnici_groups` (`id`, `korisnici_id`, `group_id`) VALUES
(1, 1, 1),
(3, 2, 2),
(2, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `myapp_korisnici_user_permissions`
--

CREATE TABLE `myapp_korisnici_user_permissions` (
  `id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `myapp_korisnici_user_permissions`
--

INSERT INTO `myapp_korisnici_user_permissions` (`id`, `korisnici_id`, `permission_id`) VALUES
(1, 1, 24),
(2, 1, 26),
(3, 1, 28),
(4, 1, 29),
(5, 1, 30),
(6, 1, 31),
(8, 2, 29),
(9, 2, 30),
(10, 2, 31),
(7, 2, 32),
(12, 3, 29),
(13, 3, 30),
(14, 3, 31),
(11, 3, 32);

-- --------------------------------------------------------

--
-- Table structure for table `myapp_predmeti`
--

CREATE TABLE `myapp_predmeti` (
  `id` int(11) NOT NULL,
  `ime` varchar(255) NOT NULL,
  `kod` varchar(16) NOT NULL,
  `program` longtext NOT NULL,
  `bodovi` int(11) NOT NULL,
  `sem_redovni` int(11) NOT NULL,
  `sem_izvanredni` int(11) NOT NULL,
  `izborni` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `myapp_predmeti`
--

INSERT INTO `myapp_predmeti` (`id`, `ime`, `kod`, `program`, `bodovi`, `sem_redovni`, `sem_izvanredni`, `izborni`) VALUES
(2, 'Fizika', 'SIT002', 'Program', 6, 1, 3, 'ne'),
(3, 'Osnove elektrotehnike', 'SIT003', 'Program', 6, 1, 1, 'ne'),
(4, 'Digitalna i mikroprocesorska tehnika', 'SIT004', 'Program nije unesen', 7, 1, 2, 'ne'),
(5, 'Uporaba računala', 'SIT005', 'Program nije unesen', 4, 1, 1, 'ne'),
(6, 'Engleski jezik 1', 'SIT006', 'Program nije unesen', 2, 1, 1, 'ne'),
(7, 'Analiza 1', 'SIT007', 'Program nije unesen', 7, 2, 2, 'ne'),
(8, 'Osnove elektronike', 'SIT008', 'Program nije unesen', 6, 2, 2, 'ne'),
(9, 'Arhitektura i organizacija digitalnih računala', 'SIT009', 'Program nije unesen', 7, 2, 3, 'ne'),
(10, 'Uvod u programiranje', 'SIT010', 'Program nije unesen', 8, 2, 3, 'ne'),
(11, 'Engleski jezik 2', 'SIT011', 'Program nije unesen', 2, 2, 2, 'ne'),
(12, 'Primijenjena i numerička matematika', 'SIT012', 'Program nije unesen', 6, 3, 4, 'ne'),
(13, 'Programske metode i apstrakcije', 'SIT013', 'Program nije unesen', 8, 3, 4, 'ne'),
(14, 'Baze podataka', 'SIT014', 'Program nije unesen', 6, 3, 5, 'ne'),
(15, 'Informacijski sustavi', 'SIT015', 'Program nije unesen', 6, 3, 4, 'ne'),
(16, 'Tehnički Engleski jezik', 'SIT016', 'Program nije unesen', 4, 3, 5, 'ne'),
(17, 'Računalne mreže', 'SIT017', 'Program nije unesen', 5, 4, 5, 'ne'),
(18, 'Operacijski sustavi', 'SIT018', 'Program nije unesen', 5, 4, 5, 'ne'),
(19, 'Strukture podataka i algoritmi', 'SIT019', 'Program nije unesen', 5, 4, 6, 'da'),
(20, 'Objektno programiranje', 'SIT020', 'Program nije unesen', 5, 4, 6, 'da'),
(21, 'Baze podataka 2', 'SIT021', 'Program nije unesen', 5, 4, 6, 'da'),
(22, 'Mrežne usluge i programiranje', 'SIT022', 'Program nije unesen', 5, 4, 6, 'da'),
(23, 'Arhitektura osobnih računala', 'SIT023', 'Program nije unesen', 5, 4, 6, 'da'),
(24, 'Projektiranje i upravljanje računalnim mrežama', 'SIT024', 'Program nije unesen', 5, 4, 6, 'da'),
(25, 'Projektiranje informacijskih sustava', 'SIT025', 'Program nije unesen', 5, 4, 6, 'da'),
(26, 'Informatizacija poslovanja', 'SIT026', 'Program nije unesen', 5, 4, 6, 'da'),
(27, 'Ekonomika i organizacija poduzeća', 'SIT027', 'Program nije unesen', 2, 5, 7, 'ne'),
(28, 'Analiza 2', 'SIT028', 'Program nije unesen', 6, 5, 7, 'ne'),
(29, 'Industrijska praksa', 'SIT029', 'Program nije unesen', 2, 5, 7, 'ne'),
(30, 'Arhitektura poslužiteljskih računala', 'SIT030', 'Program nije unesen', 5, 5, 7, 'da'),
(31, 'Sigurnost računala i podataka', 'SIT031', 'Program nije unesen', 5, 5, 7, 'da'),
(32, 'Programski alati na UNIX računalima', 'SIT032', 'Program nije unesen', 5, 5, 7, 'da'),
(33, 'Napredno Windows programiranje', 'SIT033', 'Program nije unesen', 5, 5, 7, 'da'),
(34, 'Objektno orijentirano modeliranje', 'SIT034', 'Program nije unesen', 5, 5, 7, 'da'),
(35, 'Programiranje u Javi', 'SIT035', 'Program nije unesen', 5, 5, 7, 'da'),
(36, 'Programiranje na Internetu', 'SIT036', 'Program nije unesen', 5, 5, 7, 'da'),
(37, 'Elektroničko poslovanje', 'SIT037', 'Program nije unesen', 5, 5, 7, 'da'),
(38, 'Diskretna matematika', 'SIT038', 'Program nije unesen', 6, 6, 8, 'ne'),
(39, 'Upravljanje poslužiteljskim računalima', 'SIT039', 'Program nije unesen', 5, 6, 8, 'da'),
(40, 'Programiranje u C#', 'SIT040', 'Program nije unesen', 5, 6, 8, 'da'),
(41, 'Društveni informacijski sustavi', 'SIT041', 'Program nije unesen', 5, 6, 8, 'da'),
(42, 'Oblikovanje Web stranica', 'SIT042', 'Program nije unesen', 5, 6, 8, 'da'),
(43, 'Vođenje projekata i dokumentacija', 'SIT043', 'Program nije unesen', 5, 6, 8, 'da'),
(44, 'Informatizacija proizvodnje', 'SIT044', 'Program nije unesen', 5, 6, 8, 'da'),
(45, 'Analiza i obrada podataka', 'SIT045', 'Program nije unesen', 5, 6, 8, 'da'),
(46, 'Njemački jezik', 'SSZP40', 'Program nije unesen', 4, 6, 8, 'da'),
(47, 'Talijanski jezik', 'SSZP50', 'Program nije unesen', 4, 6, 8, 'da'),
(48, 'Završni rad', 'SIT046', 'Program nije unesen', 8, 6, 8, 'ne'),
(50, 'Linearna algebra', 'SIT001', 'Nije unesen', 6, 1, 1, 'ne');

-- --------------------------------------------------------

--
-- Table structure for table `myapp_upisi`
--

CREATE TABLE `myapp_upisi` (
  `id` int(11) NOT NULL,
  `status` varchar(64) NOT NULL,
  `predmet_id_id` int(11) NOT NULL,
  `student_id_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `myapp_upisi`
--

INSERT INTO `myapp_upisi` (`id`, `status`, `predmet_id_id`, `student_id_id`) VALUES
(1, 'passed', 19, 2),
(2, 'passed', 17, 2),
(6, 'passed', 3, 3),
(7, 'passed', 13, 3),
(9, 'passed', 6, 3),
(10, 'passed', 19, 3),
(11, 'enrolled', 48, 3),
(12, 'passed', 6, 2),
(15, 'enrolled', 18, 2),
(36, 'enrolled', 11, 2),
(40, 'passed', 32, 12),
(41, 'passed', 2, 12),
(42, 'passed', 17, 12),
(45, 'passed', 13, 12),
(46, 'passed', 10, 12),
(47, 'enrolled', 42, 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_myapp_korisnici_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `myapp_korisnici`
--
ALTER TABLE `myapp_korisnici`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `myapp_korisnici_groups`
--
ALTER TABLE `myapp_korisnici_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `myapp_korisnici_groups_korisnici_id_group_id_198bfbe6_uniq` (`korisnici_id`,`group_id`),
  ADD KEY `myapp_korisnici_groups_group_id_60b61136_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `myapp_korisnici_user_permissions`
--
ALTER TABLE `myapp_korisnici_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `myapp_korisnici_user_per_korisnici_id_permission__465653a3_uniq` (`korisnici_id`,`permission_id`),
  ADD KEY `myapp_korisnici_user_permission_id_a105329b_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `myapp_predmeti`
--
ALTER TABLE `myapp_predmeti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kod` (`kod`);

--
-- Indexes for table `myapp_upisi`
--
ALTER TABLE `myapp_upisi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `myapp_upisi_predmet_id_id_96f86884_fk_myapp_predmeti_id` (`predmet_id_id`),
  ADD KEY `myapp_upisi_student_id_id_90f0b6c3_fk_myapp_korisnici_id` (`student_id_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `myapp_korisnici`
--
ALTER TABLE `myapp_korisnici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `myapp_korisnici_groups`
--
ALTER TABLE `myapp_korisnici_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `myapp_korisnici_user_permissions`
--
ALTER TABLE `myapp_korisnici_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `myapp_predmeti`
--
ALTER TABLE `myapp_predmeti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `myapp_upisi`
--
ALTER TABLE `myapp_upisi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_myapp_korisnici_id` FOREIGN KEY (`user_id`) REFERENCES `myapp_korisnici` (`id`);

--
-- Constraints for table `myapp_korisnici_groups`
--
ALTER TABLE `myapp_korisnici_groups`
  ADD CONSTRAINT `myapp_korisnici_grou_korisnici_id_9e7a6f93_fk_myapp_kor` FOREIGN KEY (`korisnici_id`) REFERENCES `myapp_korisnici` (`id`),
  ADD CONSTRAINT `myapp_korisnici_groups_group_id_60b61136_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `myapp_korisnici_user_permissions`
--
ALTER TABLE `myapp_korisnici_user_permissions`
  ADD CONSTRAINT `myapp_korisnici_user_korisnici_id_c85c54c3_fk_myapp_kor` FOREIGN KEY (`korisnici_id`) REFERENCES `myapp_korisnici` (`id`),
  ADD CONSTRAINT `myapp_korisnici_user_permission_id_a105329b_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `myapp_upisi`
--
ALTER TABLE `myapp_upisi`
  ADD CONSTRAINT `myapp_upisi_predmet_id_id_96f86884_fk_myapp_predmeti_id` FOREIGN KEY (`predmet_id_id`) REFERENCES `myapp_predmeti` (`id`),
  ADD CONSTRAINT `myapp_upisi_student_id_id_90f0b6c3_fk_myapp_korisnici_id` FOREIGN KEY (`student_id_id`) REFERENCES `myapp_korisnici` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
