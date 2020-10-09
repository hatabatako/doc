<?php
/**
 * The template for displaying Comments.
 *
 * The area of the page that contains both current comments
 * and the comment form. The actual display of comments is
 * handled by a callback to lineday_comment() which is
 * located in the library/lineday.php file.
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() )
	return;
?>

	<div id="comments" class="comments-area">

	<?php // You can start editing here -- including this comment! ?>

	<?php if ( have_comments() ) : ?>
		<header class="page-header">
			<h2 class="comments-title">
				<?php
					printf( _nx( 'One Response on &ldquo;%2$s&rdquo;', '%1$s Responses on &ldquo;%2$s&rdquo;', get_comments_number(), 'comments title', 'lineday' ),
						number_format_i18n( get_comments_number() ), '<span>' . get_the_title() . '</span>' );
				?>
			</h2>
		</header>

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
		<nav id="comment-nav-above" class="comment-navigation" role="navigation">
			<h5 class="screen-reader-text"><?php _e( 'Comment navigation', 'lineday' ); ?></h5>
			<ul class="pager">
				<li class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'lineday' ) ); ?></li>
				<li class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'lineday' ) ); ?></li>
			</ul>
		</nav><!-- #comment-nav-above -->
		<?php endif; // check for comment navigation ?>

		<ol class="comment-list media-list">
			<?php
				/* Loop through and list the comments. Tell wp_list_comments()
				 * to use lineday_comment() to format the comments.
				 * If you want to overload this in a child theme then you can
				 * define lineday_comment() and that will be used instead.
				 * See lineday_comment() in includes/template-tags.php for more.
				 */
				wp_list_comments( array(
					'callback' => 'lineday_comment',
					'avatar_size' => 50,
				) );
			?>
		</ol><!-- .comment-list -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
		<nav id="comment-nav-below" class="comment-navigation" role="navigation">
			<h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'lineday' ); ?></h1>
			<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'lineday' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'lineday' ) ); ?></div>
		</nav><!-- #comment-nav-below -->
		<?php endif; // check for comment navigation ?>

	<?php endif; // have_comments() ?>

	<?php comment_form(); ?>

</div><!-- #comments -->