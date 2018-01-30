<?php

/*
Plugin Name: Tok Gallery Board
Plugin URI: https://github.com/genius22222/tok-gallery-board
Description: Плагин для вывода и настройки плитки ссылок с изображениями
Version: 1.0
Author: Alexander Archibasov
Author URI: https://vk.com/id89802582
License:Freeware
*/

//Меню темы
add_action('admin_menu', 'tok_add_theme_menu');
function tok_add_theme_menu(){
	wp_register_style( 'tok_gal_menu', plugins_url('/set/tok-gal-menu.css', __FILE__), 'beta1.0' );
	wp_enqueue_style( 'tok_gal_menu', plugins_url('/set/tok-gal-menu.css', __FILE__), 'beta1.0' );
	wp_enqueue_script( 'tok_handler_admin_gallery', plugins_url('/set/tok-handler-admin-gallery.js', __FILE__), array( 'jquery' ) );
	wp_enqueue_script( 'tok_handler_admin_gallery' );

	add_menu_page('Настройка галерии PC', 'Галлерея PC', 'manage_options', 'tok_gallery_board', 'tok_gallery_board_page', '', 4);
	function tok_gallery_board_page(){

	    register_setting('tok_gallery_board' , 'tok_gallery_board_settings');
		add_settings_section('tok_gallery_board_select_image','Настройки соотвествия изображений', '', 'tok_gallery_board');
		add_settings_field('tok_gallery_board_select_settings', '', 'tok_gallery_board_select_settings_show','tok_gallery_board', 'tok_gallery_board_select_image');

		//Обработчик формы
        if ((isset($_POST['tok_gallery_board_send_form_controller'])) && ($_POST['tok_gallery_board_send_form_controller'] == 'ok')){
            if (isset($_POST['tok_gallery_board_select_settings'])){
                update_option('tok_gallery_board_select_settings' , $_POST['tok_gallery_board_select_settings']);
            }
        }

		?>
		<div class="wrap">
			<h2>Панель настройки галлереи</h2>
			<form id="tok_form" method="post">
				<?php
                settings_fields('tok_gallery_board');
                do_settings_fields('tok_gallery_board', 'tok_gallery_board_select_image');
				?>
                <input type="hidden" name="tok_gallery_board_send_form_controller" id="tok_gallery_board_send_form_controller" value="ok">
				<div id="n0" class="tok_imagebox"><div id="tki0" class="tok_image"><div class="image"></div><input type="text" id="tok-link"></div></div>
				<div class="tok_add_imagebox_button"><img src="<?php echo plugins_url('/set/menu-plus.png', __FILE__) ?>"></div>

				<?php
				submit_button();
				?>
			</form>
		</div>
		<?php
	}
	function tok_gallery_board_select_settings_show(){ ?>
		<input type="hidden" id="tok_gallery_board_select_settings" name="tok_gallery_board_select_settings" value="<?php echo get_option('tok_gallery_board_select_settings'); ?>">
		<?php
	}
}