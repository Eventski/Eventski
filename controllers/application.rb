class ApplicationController < Sinatra::Base
  require 'bundler'
  Bundler.require

  require 'dotenv'
  Dotenv.load

  ActiveRecord::Base.establish_connection(
    :database => 'eventski',
    # :database => ENV['DB_NAME'],
    :adapter => 'postgresql'
    # :username => 'postgres',
    # :host => 'localhost',
    # :password => ENV['DB_PASSWORD']
  )

set :views, File.expand_path('../../views', __FILE__)
set :public_dir, File.expand_path('../../public', __FILE__)

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
