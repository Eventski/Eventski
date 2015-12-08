class ApplicationController < Sinatra::Base
  require 'bundler'
  Bundler.require

  require 'dotenv'
  Dotenv.load

  ActiveRecord::Base.establish_connection(
    :database => ENV['DB_NAME'],
    :adapter => 'postgresql'
  )

# set :views, FILE.expand_path('../../views', __FILE__)
# set :public_dir, FILE.expand_path('../../public', __FILE__)

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
