<?php
/**
 * @package TipApp
 * @version 1.0.0
 */
/*
Plugin Name: TipApp Button
Plugin URI: https://github.com/GeoJosh/tipapp
Description: TipApp widget and block for use with Wordpress
Author: Joshua Penton
Version: 1.0.0
Author URI: https://github.com/GeoJosh
*/

// Register and load the widget
function tipapp_load_widget() {
  register_widget( 'tipapp_widget' );
}
add_action('widgets_init', 'tipapp_load_widget');
 
// Create the widget 
class tipapp_widget extends WP_Widget {
 
  function __construct() {
    parent::__construct(
      'tipapp_widget', 
      __('TipApp Donation Button', 'tipapp_widget_domain'), 
      array(
          'description' => __('TipApp Donation Button', 'tipapp_widget_domain'),
      ) 
    );
  }
 
  public function widget($args, $instance) {
    $tipapp_api_base = apply_filters('tipapp_api_base', $instance['tipapp_api_base']);
    $tipapp_button_label = apply_filters('tipapp_button_label', $instance['tipapp_button_label']);

    if (!empty($tipapp_api_base)) {
      ?>

        <button
          class="tipapp-action-button"
          onclick="loadTip(this, '<?php echo $tipapp_api_base; ?>')">
          <?php echo $tipapp_button_label; ?>
        </button>
      <?php
    }
    echo $args['after_widget'];
  }
   
  // Widget Backend 
  public function form($instance) {
    if (isset($instance['tipapp_api_base'])) {
      $tipapp_api_base = $instance['tipapp_api_base'];
    }
    else {
      $tipapp_api_base = __('Remote API Base URL', 'tipapp_widget_domain');
    }

    // Widget admin form
    ?>
    <p>
      <label
        for="<?php echo $this->get_field_id('tipapp_api_base'); ?>">
          <?php _e('Remote API Base URL:'); ?>
      </label> 
      <input
        class="widefat"
        id="<?php echo $this->get_field_id('tipapp_api_base'); ?>"
        name="<?php echo $this->get_field_name('tipapp_api_base'); ?>"
        type="text"
        value="<?php echo esc_attr( $tipapp_api_base ); ?>"
      />
    </p>
    <p>
      <label
        for="<?php echo $this->get_field_id('tipapp_button_label'); ?>">
          <?php _e('Tip Button Label:'); ?>
      </label> 
      <input
        class="widefat"
        id="<?php echo $this->get_field_id('tipapp_button_label'); ?>"
        name="<?php echo $this->get_field_name('tipapp_button_label'); ?>"
        type="text"
        value="<?php echo esc_attr( $tipapp_button_label ); ?>"
      />
    </p>
    <?php 
  }
   
  public function update($new_instance, $old_instance) {
    $instance = array();
    $instance['tipapp_api_base'] = (!empty( $new_instance['tipapp_api_base'])) ? $new_instance['tipapp_api_base']: '';
    $instance['tipapp_button_label'] = (!empty( $new_instance['tipapp_button_label'])) ? $new_instance['tipapp_button_label']: '';
    return $instance;
  }
}

function tipapp_block() {
  wp_enqueue_script('tipapp-block', plugin_dir_url(__FILE__) . 'tipapp-block.js', array('wp-blocks','wp-editor'), '1.1', true);
}
add_action('enqueue_block_editor_assets', 'tipapp_block');

// Enqueue Widget Javascript
function tipapp_scripts() {
  wp_register_script('tipapp_script', plugins_url('tipapp.js', __FILE__), array('jquery', 'jquery-ui-dialog'), '1.1', true);
  wp_enqueue_script('tipapp_script');
  wp_localize_script('tipapp_script', 'tipapp_configuration', array(
    'logo_url' => plugins_url('venmo_logo_white.png', __FILE__),
    ));

} 
add_action('wp_enqueue_scripts', 'tipapp_scripts');  

// Enqueue Widget Stylesheet
function tipapp_styles() {
  wp_register_style('tipapp_stylesheet', plugins_url('tipapp.css', __FILE__));
  wp_enqueue_style('tipapp_stylesheet');
  wp_enqueue_style( 'wp-jquery-ui-dialog' );
}
add_action('wp_enqueue_scripts', 'tipapp_styles');
