<?php

class <%= capitalizeName %>Secondary extends <%= capitalizeName %>Module
{
  static $instance;

  static function instance()
  {
    if (self::$instance == null) {
      self::$instance = new <%= capitalizeName %>Secondary();
    }
    return self::$instance;
  }

  public function __construct()
  {
    parent::__construct('secondary', '0.0.1', array());

    add_action('admin_enqueue_scripts', array($this, 'hook_wp_enqueue_scripts'));
  }

  function admin_menu()
  {
    $this->add_menu_page('index', __('Secondary', '<%= lowercaseName %>'));
  }

  function hook_wp_enqueue_scripts()
  {
    $<%= lowercaseName %>_url = plugins_url('<%= lowercaseName %>');
  }
}

<%= capitalizeName %>Secondary::instance();
