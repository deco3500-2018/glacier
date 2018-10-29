<?php
/**
 * Configuration for database connection
 *
 */
$host       = "localhost";
$username   = "dumbo";
$password   = "china";
$dbname     = "campfire";
$dsn        = "mysql:host=$host;dbname=$dbname";
$options    = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
              );