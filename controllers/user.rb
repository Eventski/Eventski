class UserController < ApplicationController

  get '/' do
    erb :login
  end

  post '/login' do
    user = Account.authenticate(params[:user_name], params[:password])
    if user
      session[:current_user] = user
      redirect '/home'
    else
      @message = "Password or Username is incorrect, please try again."
      erb :login
    end
  end

  post '/register' do
    if does_user_exist(params[:user_name]) == true
      @message = "That username already exists, try a different one."
    end
    user = Account.create(user_name: params[:user_name], user_email: params[:user_email],
    password: params[:password])

    session[:current_user]
    redirect '/first'

  end

  get '/home' do
    authorization_check
    @user_name = session[:current_user].user_name
    erb :home
  end

  get '/first' do
    authorization_check
    @user_name = session[:current_user].user_name
    erb :first
  end

  get '/not_authorized' do
    erb :not_authorized
  end

  get '/logout' do
    authorization_check
    session[:current_user] = nil
    redirect '/'
  end

end
