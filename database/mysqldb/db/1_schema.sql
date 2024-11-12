-- tbl_product definition --
CREATE TABLE `tbl_product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `price` decimal(20,6) NOT NULL,
  `stock` int(11) NOT NULL,
  `weight` decimal(20,6) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `length` decimal(20,6) DEFAULT NULL,
  `width` decimal(20,6) DEFAULT NULL,
  `height` decimal(20,6) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `supplier_id` bigint(20) unsigned DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- tbl_order definition --
CREATE TABLE `tbl_order` (
  `id` char(36) NOT NULL,
  `customer_id` longtext DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `order_date` datetime(3) DEFAULT NULL,
  `order_cancel_date` datetime(3) DEFAULT NULL,
  `total_quantity` bigint(20) DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_by` varchar(191) DEFAULT NULL,
  `updated_by` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_unique` (`number`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- tbl_order_detail definition --
CREATE TABLE `tbl_order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(191) DEFAULT NULL,
  `product_code` varchar(191) DEFAULT NULL,
  `quantity` bigint(20) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_by` varchar(191) DEFAULT NULL,
  `updated_by` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- tbl_user definition --
CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` longtext DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- tbl_permission --
CREATE TABLE `tbl_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- tbl_role definition --
CREATE TABLE `tbl_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- tbl_role_in_permission definition --
CREATE TABLE `tbl_role_in_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;