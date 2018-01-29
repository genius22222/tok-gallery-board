<?php

/*
Plugin Name: Tok Gallery Board
Plugin URI: http://github.com/
Description: A brief description of the Plugin.
Version: 1.0
Author: network
Author URI: http://URI_Of_The_Plugin_Author
License: A "Slug" license name e.g. GPL2
*/

//Меню темы
add_action('admin_menu', 'tok_add_theme_menu');
function tok_add_theme_menu(){
	add_menu_page('Настройка галерии PC', 'Галлерея PC', 'manage_options', 'tok_theme_gal_settings', 'tok_theme_gal_settings', '', 4);
	wp_register_style( 'tok_gal_menu', get_template_directory_uri() . '/admin-gallery/tok-gal-menu.css', 'beta1.0' );
	wp_enqueue_style( 'tok_gal_menu', get_template_directory_uri() . '/admin-gallery/tok-gal-menu.css', 'beta1.0' );
	wp_enqueue_script( 'tok_handler_admin_gallery', get_template_directory_uri() . '/admin-gallery/tok-handler-admin-gallery.js', array( 'jquery' ) );
	wp_enqueue_script( 'tok_handler_admin_gallery' );
	function tok_theme_gal_settings(){
		add_settings_section( 'section1', 'Количество иконок', null, 'tok_theme_gal_settings' );
		add_settings_field('tok_set','', 'tok_display_imagebox', 'tok_theme_gal_settings','section1');
		?>
		<div class="wrap">
			<h1>Панель настройки галлереи</h1>
			<form method="post">
				<?php
				settings_fields("section1");
				do_settings_sections("tok_theme_gal_settings");
				?>
				<div class="tok_imagebox tib1"><div class="tok_image"><input type="text" id="tok-link"></div></div>
				<div class="tok_add_imagebox_button"><img src="<?php echo get_template_directory_uri() ?>/admin-gallery/menu-plus.png"></div>
				<?php
				submit_button();
				?>
			</form>
		</div>
		<?php
	}
	function tok_display_imagebox(){ ?>
		<input type="hidden" name="tok_set" value="<?php echo get_option('tok_set'); ?>">
		<?php
	}
}