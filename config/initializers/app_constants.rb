ROLE_NAME = {
  :admin => "admin",
  :manager => "manager",
  :data_entry => "dataentry"
}

 

# => TIMEZONE ( for 1 store deployment. For multitenant => different story) 
UTC_OFFSET = 7 
LOCAL_TIME_ZONE = "Jakarta" 

EXT_41_JS = 'https://s3.amazonaws.com/weyewe-extjs/41/ext-all.js'

EXTENSIBLE = 'https://s3.amazonaws.com/weyewe-extjs/extensible-all.js'

VIEW_VALUE = {
  :week => 0, 
  :month => 1, 
  :year => 2 
}

INCOME_CASE = {
  # booking related 
  :downpayment => 0 ,
  :remaining_payment => 1  
}

IMAGE_ASSET_URL = {
  
  # MSG BOX
  :alert => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/alert.png',
  :background => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/background.png',
  :confirm => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/confirm.png',
  :error => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/error.png',
  :info => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/info.png',
  :question => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/question.png',
  :success => 'http://s3.amazonaws.com/salmod/app_asset/msg-box/success.png',
  
  
  # FONT 
  :font_awesome_eot => 'http://s3.amazonaws.com/salmod/app_asset/font/fontawesome-webfont.eot',
  :font_awesome_svg => 'http://s3.amazonaws.com/salmod/app_asset/font/fontawesome-webfont.svg',
  :font_awesome_svgz =>'http://s3.amazonaws.com/salmod/app_asset/font/fontawesome-webfont.svgz',
  :font_awesome_ttf => 'http://s3.amazonaws.com/salmod/app_asset/font/fontawesome-webfont.ttf',
  :font_awesome_woff => 'http://s3.amazonaws.com/salmod/app_asset/font/fontawesome-webfont.woff',  
  
  
  # BOOTSTRAP SPECIFIC 
  :glyphicons_halflings_white => 'http://s3.amazonaws.com/salmod/app_asset/bootstrap/glyphicons-halflings-white.png',
  :glyphicons_halflings_black => 'http://s3.amazonaws.com/salmod/app_asset/bootstrap/glyphicons-halflings.png',
  
  # jquery UI-lightness 
  :ui_bg_diagonal_thick_18 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_diagonals-thick_18_b81900_40x40.png',
  :ui_bg_diagonal_thick_20 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_diagonals-thick_20_666666_40x40.png',
  :ui_bg_flat_10 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_flat_10_000000_40x100.png' , 
  :ui_bg_glass_100_f6f6f6 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_glass_100_f6f6f6_1x400.png',
  :ui_bg_glass_100 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_glass_100_fdf5ce_1x400.png',
  :ui_bg_glass_65 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_glass_65_ffffff_1x400.png',
  :ui_bf_gloss_wave => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_gloss-wave_35_f6a828_500x100.png',
  :ui_bg_highlight_soft_100 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_gloss-wave_35_f6a828_500x100.png',
  :ui_bg_highlight_soft_75 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_highlight-soft_75_ffe45c_1x100.png',
  :ui_icons_222222 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-icons_222222_256x240.png',
  :ui_icons_228ef1 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-icons_228ef1_256x240.png',
  :ui_icons_ef8c08 => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-icons_ef8c08_256x240.png',
  :ui_icons_ffd27a => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-icons_ffd27a_256x240.png',
  :ui_icons_ffffff => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-icons_ffffff_256x240.png',
  :ui_bg_highlight_soft_100_eeeeee => 'http://s3.amazonaws.com/salmod/app_asset/jquery-ui/ui-bg_highlight-soft_100_eeeeee_1x100.png',
  
  
  # APP_APPLICATION.css 
  :jquery_handle => 'http://s3.amazonaws.com/salmod/app_asset/app_application/handle.png',
  :jquery_handle_vertical => 'http://s3.amazonaws.com/salmod/app_asset/app_application/handle-vertical.png',
  :login_bg => 'http://s3.amazonaws.com/salmod/app_asset/app_application/login-bg.png',
  :user_signin => 'http://s3.amazonaws.com/salmod/app_asset/app_application/user.png',
  :password => 'http://s3.amazonaws.com/salmod/app_asset/app_application/password.png',
  :password_error => 'http://s3.amazonaws.com/salmod/app_asset/app_application/password_error.png',
  :check_signin => 'http://s3.amazonaws.com/salmod/app_asset/app_application/check.png',
  :twitter => 'http://s3.amazonaws.com/salmod/app_asset/app_application/twitter_btn.png',
  :fb_button => 'http://s3.amazonaws.com/salmod/app_asset/app_application/fb_btn.png',
  :validation_error => 'http://s3.amazonaws.com/salmod/app_asset/app_application/validation-error.png',
  :validation_success => 'http://s3.amazonaws.com/salmod/app_asset/app_application/validation-success.png',
  :zoom => 'http://s3.amazonaws.com/salmod/app_asset/app_application/zoom.png',
  :logo => 'http://s3.amazonaws.com/salmod/app_asset/app_application/logo.png' 
}