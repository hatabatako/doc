<?php
/**
 * functions and definitions
 */

require_once( 'library/setup.php' );
require_once( 'library/nav.php' );
require_once( 'library/widgets.php' );

require_once( 'library/lineday.php' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/library/underscores/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/library/underscores/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/library/underscores/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/library/underscores/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/library/underscores/jetpack.php';


/**
 * Enqueue scripts and styles
 */
function lineday_scripts() {

    // load lineday styles
    wp_enqueue_style( 'lineday-style', get_stylesheet_uri() );

    // load bootstrap css
    wp_enqueue_style( 'lineday-bootstrap', get_template_directory_uri() . '/assets/css/bootstrap/bootstrap.min.css' );

    // load bootstrap for WordPress css
    wp_enqueue_style( 'lineday-bootstrapwp', get_template_directory_uri() . '/assets/css/bootstrap-wp.css' );

    // load font awesome css
    wp_enqueue_style( 'lineday-fontawesome', get_template_directory_uri() . '/assets/css/FontAwesome/font-awesome.min.css' , array(), '4.3.0', 'all' );

    // load bootstrap.js
    wp_enqueue_script('lineday-bootstrapjs', get_template_directory_uri().'/assets/js/bootstrap/bootstrap.js', array('jquery') );

    // load bootstrap-wp.js
    wp_enqueue_script( 'lineday-bootstrapwp', get_template_directory_uri() . '/assets/js/bootstrap-wp.js', array('jquery') );

    // FitVid (responsive video)
    wp_enqueue_script( 'lineday-fitvids', get_template_directory_uri() . '/assets/js/FitVids.js-master/jquery.fitvids.js', array('jquery') );

    wp_enqueue_script( 'lineday-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20130115', true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    //load keyboard-image-navigation.js
    if ( is_singular() && wp_attachment_is_image() ) {
        wp_enqueue_script( 'lineday-keyboard-image-navigation', get_template_directory_uri() . '/assets/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
    }

}
add_action( 'wp_enqueue_scripts', 'lineday_scripts', 100);


/**
 * Automatic subscription form (auto generated code) 
 */
require_once(dirname(__FILE__) . '/theme-follow.php');

 ?>