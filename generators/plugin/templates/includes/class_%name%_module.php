<?php

class <%= capitalizeName %>Module
{
  var $module;
  var $version;
  var $old_version;
  var $prefix;
  var $components;

  public function __construct($module, $version, $components = array())
  {
    $this->module = $module;
    $this->version = $version;
    $this->prefix = '<%= lowercaseName %>_' . $module;
    array_unshift($components, '');
    $this->components = $components;

    add_action('admin_menu', array($this, 'admin_menu'));
    add_action('init', array($this, 'hook_wp_enqueue_styles'), 1);
  }

  function hook_activate()
  {
    global $wpdb;
    $wpdb_collate = $wpdb->collate;

    $queries = [
      <<<SQL
        -- CREATE TABLE <%= lowercaseName %>_t1 (...) COLLATE {$wpdb_collate};
      SQL,
      <<<SQL
        -- CREATE TABLE <%= lowercaseName %>_t2 (...) COLLATE {$wpdb_collate};
      SQL
    ];

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    foreach ($queries as $query) {
      dbDelta($query);

      // WP does not manage composite primary key when it tries to upgrade a table...
      $wpdb->suppress_errors(true);
    }
  }

  function hook_uninstall()
  {
    global $wpdb;

    $sql = <<<SQL
      -- DROP TABLE IF EXISTS
      -- {$wpdb->prefix}<%= lowercaseName %>_t1,
      -- {$wpdb->prefix}<%= lowercaseName %>_t2
      -- CASCADE;
    SQL;

    $wpdb->query($sql);
  }

  function admin_menu()
  {
  }

  function add_menu_page($page, $title)
  {
    $name = '<%= lowercaseName %>_' . $this->module . '_' . $page;
    add_submenu_page('<%= lowercaseName %>_main_index', $title, $title, 'exist', $name, array($this, 'menu_page'));
  }

  function sanitize_file_name($name)
  {
    return preg_replace('/[^a-z_\\-]/i', '', $name);
  }

  function menu_page()
  {
    global $plugin_page;

    $parts = explode('_', $plugin_page, 3);
    $module = $this->sanitize_file_name($parts[1]);
    $page = $this->sanitize_file_name($parts[2]);
    $page = str_replace('_', '-', $page);

    $file = <%= uppercaseName %>_DIR . '/modules/' . $module . '/' . $page . '.php';

    require $file;
  }

  function hook_wp_enqueue_styles()
  {
    if (empty($this->options['css_disabled']) && apply_filters('<%= lowercaseName %>_enqueue_style', true)) {
      wp_enqueue_style('<%= lowercaseName %>', plugins_url('<%= lowercaseName %>') . '/style.css', array(), <%= uppercaseName %>_VERSION);
      if (!empty($this->options['css'])) {
        wp_add_inline_style('<%= lowercaseName %>', $this->options['css']);
      }
    }
  }
}
