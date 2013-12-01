class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :sign_in
  helper_method :correct_user?
  helper_method :current_user
  helper_method :current_user_is_admin?
  helper_method :current_user_signed_in?
  helper_method :google_universal_analytics_tracking_code
  helper_method :import_noises
  helper_method :verify_admin

  private

    def sign_in(user) 
      # Reset the session after successful login, per
      # 2.8 Session Fixation – Countermeasures:
      # http://guides.rubyonrails.org/security.html#session-fixation-countermeasures
      reset_session
      session[:user_id] = user.id
      user.add_role :admin if User.count == 1 # make the first user an admin
    end

    def sign_out
      reset_session
    end

    def authenticate_user!
      if !current_user
        redirect_to root_url, :alert => 'You need to sign in for access to this page.'
      end
    end

    def correct_user?
      @user = User.find(params[:id])
      unless current_user == @user
        redirect_to root_url, :alert => "Access denied."
      end
    end

    def current_user
      begin
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
      rescue Exception => exception
        Rails.logger.error exception
        nil
      end
    end

    def current_user_is_admin?
      @current_user_is_admin ||= current_user_signed_in? && current_user.has_role?(:admin)
    end

    def current_user_signed_in?
      return true if current_user
    end

    def verify_admin
      redirect_to root_url unless current_user.has_role? :admin
    end

    def import_noises
      TwitterNoiseImporter.import_latest_from_sidewalks_twitter
    end

    def google_universal_analytics_tracking_code
      if Rails.env.production?
        ENV['GOOGLE_UNIVERSAL_ANALYTICS_TRACKING_CODE']
      end
    end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

end
