<?php

// Ajouter la prise en charge des images mises en avant
add_theme_support( 'post-thumbnails' );

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

// Chargement des scripts et styles
function sandycreation_register_assets() {
  // wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, '3.3.1', true);
  wp_enqueue_style('sandycreation', get_stylesheet_uri(), array(), '1.0');
}

add_action('wp_enqueue_scripts', 'sandycreation_register_assets');
