class ApplicationController < Sinatra::Base
  require 'bundler'
  Bundler.require

  ActiveRecord::Base.establish_connection(
    :adapter => 'postgresql',
    :database => 'eventski'
  )

set :views, FILE.expand_path('../../views', __FILE__)
set :public, FILE.expand_path('../../public', __FILE__)

enable :sessions

  def does_user_exist(username)
    user = Account.find_by(:user_name => username)
    if user
      return true
    else
      return false
    end
  end

  def authorization_check
    if session[:current_user] == nil
      redirect '/not_authorized'
      return false
    else
      return true
    end
  end

end
