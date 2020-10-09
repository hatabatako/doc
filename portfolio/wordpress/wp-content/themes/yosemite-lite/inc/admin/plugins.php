<?php
/**
 * Add required and recommended plugins.
 *
 * @package yosemite-lite
 */

add_action( 'tgmpa_register', 'yosemite_lite_register_required_plugins' );

/**
 * Register required plugins
 *
 * @since  1.0
 */
function yosemite_lite_register_required_plugins() {
	$plugins = yosemite_lite_required_plugins();

	$config = array(
		'id'          => 'yosemite-lite',
		'has_notices' => false,
	);

	tgmpa( $plugins, $config );
}

/**
 * List of required plugins
 */
function yosemite_lite_required_plugins() {
	return array(
		array(
			'name' => esc_html__( 'Jetpack', 'yosemite-lite' ),
			'slug' => 'jetpack',
		),
		array(
			'name' => esc_html__( 'Slim SEO', 'yosemite-lite' ),
			'slug' => 'slim-seo',
		)
	);
}
