<?php
	// Exit if accessed directly
	if( !defined( 'ABSPATH' ) ) exit;

    $fields = wpforo_register_fields();
?>

<p id="wpforo-title"><?php wpforo_phrase('Forum - Registration') ?></p>

<?php if( wpforo_feature('user-register', $wpforo) ): ?>
    <form name="wpfreg" action="" enctype="multipart/form-data" method="POST">
      <div class="wpforo-register-wrap">
        <div class="wpforo-register-content">
         <div class="wpf-table wpforo-register-table wpfbg-9">
			  
			  <?php wpforo_fields( $fields ); ?>
              
              <div class="wpf-tr">
              		<div class="wpf-td wpfw-1"><?php do_action('register_form') ?></div>
                    <div class="wpf-cl"></div>
              </div>
              <?php if( wpforo_feature('user-register-email-confirm', $wpforo) ): ?>
                  <div class="wpf-tr">
                        <div class="wpf-td wpfw-1">
                        	<div class="wpf-field"><i class="fa fa-info-circle wpfcl-5" aria-hidden="true" style="font-size:16px;"></i> &nbsp;<?php wpforo_phrase('After registration you will receive email confimation and link for set a new password') ?></div>
                            <div class="wpf-field-cl"></div>
                        </div>
                  		<div class="wpf-cl"></div>
                  </div>
              <?php endif; ?>
              <div class="wpf-tr">
                    <div class="wpf-td wpfw-1">
                        <div class="wpf-field wpf-field-type-submit">
                            <input type="submit" value="<?php wpforo_phrase('Register') ?>" />
                        </div>
                        <div class="wpf-field-cl"></div>
                    </div>
                </div>
                <div class="wpf-cl"></div>
              </div>
        </div>
      </div>
    </form>
<?php else: ?>
<div class="wpforo-register-wrap">
    <div class="wpforo-register-content">
    	<p class="wpf-p-error"><?php wpforo_phrase('User registration is disabled') ?></p>
    </div>
</div>
<?php endif; ?>
<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>