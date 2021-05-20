<?php
/**
 * Plugin Name:       AMA x TW Weather
 * Description:       A fancy weather block!
 * Version:           1.0.0
 * Author:            Travis Ward
 * License:           GPL-2.0-or-later
 * Text Domain:       ama-weather
 */

// If this file is called directly, get out!
defined( 'ABSPATH' ) or die( 'access denied' );

define( 'AMA_DIR_PATH', plugin_dir_path( __FILE__ ) );


/**
 * Admin Settings
 */
require_once( AMA_DIR_PATH . 'src/class-ama-settings.php');
/**
 * Do a settings page for admin type folk
 */
if( is_admin() )
    $my_settings_page = new Ama_Settings();

/**
 * Weather API
 */
require_once( AMA_DIR_PATH . 'src/class-weather-api.php');
/**
 * Register our new routes from the controller.
 */
function register_weather_controller() {
	$weather_controller = new Weather_API();
	$weather_controller->register_routes();
}
add_action( 'rest_api_init', 'register_weather_controller' );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
add_action( 'init', 'create_block_ama_weather_block_init' );
function create_block_ama_weather_block_init() {
	register_block_type_from_metadata( __DIR__, [
		'render_callback' => 'render_weather_block',
	] );
}

function render_weather_block( array $attributes ): string {
	$class = 'ama-weather-block';
	ob_start();
	?>
    <div class="<?php echo esc_attr( $class ); ?>">
        <h2><?php echo $attributes["titleText"]; ?></h2>
        <p class="weather_text"><?php echo $attributes["weatherText"]; ?></p>
    </div>
        
	<?php
	return ob_get_clean();
}
