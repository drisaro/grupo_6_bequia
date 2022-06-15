-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2022 a las 01:52:35
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bequia_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion_categoria` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `descripcion_categoria`) VALUES
(1, 'Ojotas', 'descripcion'),
(2, 'Sombreros', 'descripcion sombreros'),
(3, 'Anteojos', 'Descripción de Anteojos'),
(4, 'Trajes', 'Descripción para trajes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colores`
--

CREATE TABLE `colores` (
  `id_color` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `colores`
--

INSERT INTO `colores` (`id_color`, `nombre`) VALUES
(1, 'blanco'),
(2, 'mostaza'),
(3, 'violeta'),
(4, 'negro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre_producto` varchar(60) NOT NULL,
  `descripcion_producto` text DEFAULT NULL,
  `precio_producto` decimal(10,0) NOT NULL,
  `imagen_producto` varchar(100) NOT NULL,
  `mostrar` tinyint(1) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre_producto`, `descripcion_producto`, `precio_producto`, `imagen_producto`, `mostrar`, `id_categoria`) VALUES
(1, 'Ojota de playa', 'descripción', '1500', 'imagen_producto-1650328044731-812177416.jpg', 1, 1),
(2, 'Traje de baño', 'descripción ', '1500', 'imagen_producto-1650328207306-179711397.jpg', 1, 4),
(3, 'Sombrero de cuero', 'descripción ', '2500', 'main-sombrero1.jpeg', 1, 2),
(4, 'Anteojos de sol', 'descripción ', '1000', 'main-anteojos1.png', 1, 3),
(5, 'Anteojos xxx', 'descripción ', '1000', 'main-anteojos1.png', 0, 3),
(6, 'Ojota', 'descripción', '1500', 'imagen_producto-1650328044731-812177416.jpg', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_color`
--

CREATE TABLE `producto_color` (
  `id_producto_color` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto_color`
--

INSERT INTO `producto_color` (`id_producto_color`, `id_producto`, `id_color`) VALUES
(1, 4, 4),
(2, 1, 2),
(3, 2, 4),
(4, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellidos_usuario` varchar(80) NOT NULL,
  `email_usuario` varchar(50) NOT NULL,
  `password_usuario` varchar(200) NOT NULL,
  `categoria_usuario` varchar(10) NOT NULL,
  `imagen_usuario` varchar(100) NOT NULL,
  `mostrar` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `apellidos_usuario`, `email_usuario`, `password_usuario`, `categoria_usuario`, `imagen_usuario`, `mostrar`) VALUES
(1, 'Lucas 4', 'Barale ', 'lucasbarale@gmail.com', '$2a$10$pI/3A3HcMFuyQqS4KupPJeEG3Pcue0bD56S8CU4F1Hl9rfDTj92Oa', 'admin', 'default-image.png', 1),
(2, 'David', 'Risaro', 'davidrisaro@gmail.com', '$2a$10$pI/3A3HcMFuyQqS4KupPJeEG3Pcue0bD56S8CU4F1Hl9rfDTj92Oa', 'admin', 'imagen_usuario-1651445645578-247391820.jpg', 1),
(3, 'Raimer', 'Cruz', 'raimercruz@gmail.com', '$2a$10$pI/3A3HcMFuyQqS4KupPJeEG3Pcue0bD56S8CU4F1Hl9rfDTj92Oa', 'vendedor', 'avatar4.jpg', 1),
(4, 'Anna', 'Cernik', 'annacernik@gmail.com', '$2a$10$pI/3A3HcMFuyQqS4KupPJeEG3Pcue0bD56S8CU4F1Hl9rfDTj92Oa', 'vendedor', 'imagen_usuario-1652660211000-122376092.jpg', 1),
(5, 'Prueba', 'prueba', 'prueba@gmail.com', '$2a$10$pI/3A3HcMFuyQqS4KupPJeEG3Pcue0bD56S8CU4F1Hl9rfDTj92Oa', 'admin', 'imagen_usuario-1655088265910-829813414.jpg', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `colores`
--
ALTER TABLE `colores`
  ADD PRIMARY KEY (`id_color`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `producto_color`
--
ALTER TABLE `producto_color`
  ADD PRIMARY KEY (`id_producto_color`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `colores`
--
ALTER TABLE `colores`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `producto_color`
--
ALTER TABLE `producto_color`
  MODIFY `id_producto_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `producto_color`
--
ALTER TABLE `producto_color`
  ADD CONSTRAINT `id_color` FOREIGN KEY (`id_color`) REFERENCES `colores` (`id_color`),
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
