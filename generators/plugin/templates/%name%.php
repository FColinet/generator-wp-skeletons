<?php

/**
 * Plugin Name:   <%= name %>
 * Description:   <%= description %>
 * Author:        <%= author %>
 * Version:       0.0.1
 * Text Domain:   <%= lowercaseName %>
 * Domain Path:   /languages
 *
 * @package <%= uppercaseName %>
 */

define('<%= uppercaseName %>_VERSION', '0.0.1');

define('<%= uppercaseName %>_DIR', __DIR__);
define('<%= uppercaseName %>_INCLUDES_DIR', __DIR__ . '/includes');

require_once <%= uppercaseName %>_INCLUDES_DIR . '/class_<%= lowercaseName %>_module.php';

class <%= capitalizeName %> extends <%= capitalizeName %>Module
{
  static $instance;

  static function instance()
  {
    if (self::$instance == null) {
      self::$instance = new <%= capitalizeName %>();
    }
    return self::$instance;
  }

  public function __construct()
  {
    parent::__construct('main', '1.0.0', array());

    register_activation_hook(__FILE__, array($this, 'hook_activate'));
    register_deactivation_hook(__FILE__, array($this, 'hook_deactivate'));
    register_uninstall_hook(__FILE__, array($this, 'hook_uninstall'));

    add_action('plugins_loaded', array($this, 'hook_plugins_loaded'));
    add_action('admin_enqueue_scripts', array($this, 'hook_wp_enqueue_scripts'));
  }

  function hook_activate()
  {
    parent::hook_activate();
  }

  function hook_deactivate()
  {
  }

  function hook_uninstall()
  {
    parent::hook_uninstall();
  }

  function hook_plugins_loaded()
  {
    load_plugin_textdomain('<%= lowercaseName %>', false, plugin_basename(dirname(__FILE__)) . '/languages');
  }

  function admin_menu()
  {
    add_menu_page('<%= name %>', '<%= name %>', 'exist', '<%= lowercaseName %>_main_index', null, null, '30.333');
    $this->add_menu_page('index', __('Dashboard', '<%= lowercaseName %>'));
  }

  function hook_wp_enqueue_scripts()
  {
    $<%= lowercaseName %>_url = plugins_url('<%= lowercaseName %>');
  }
}

<%= capitalizeName %>::instance();

require_once <%= uppercaseName %>_INCLUDES_DIR . '/class_<%= lowercaseName %>_secondary.php';
