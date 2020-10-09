<?php
/**
 * The template for displaying the footer.
 */
?>
            </div><!-- .row -->
        </div><!-- .container -->
    </div><!-- #content -->

    <footer id="colophon" class="site-footer" role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
        <div class="container">
            <div class="row">
            	<div class="site-footer-inner col-sm-12">
            		<div class="site-info">
            			<?php do_action( 'lineday_credits' ); ?>
            			<?php printf( __( 'Proudly powered by %s', 'lineday' ), 'WordPress' ); ?>
            			<span class="sep"> | </span>
            			<?php echo __('Theme: <a href="https://wordpress.org/themes/lineday/" rel="bookmark">LineDay</a>.', 'lineday'); ?>
            		</div><!-- .site-info -->
            	</div><!-- .site-footer-inner -->
            </div><!-- .row -->
        </div><!-- .container -->
    </footer><!-- #colophon -->

</div><!-- #page -->
<?php wp_footer(); ?>

</body>
</html>
