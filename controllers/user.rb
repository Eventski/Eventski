class UserController < ApplicationController

get '/' do
  "Hello World"
  # erb :login
end

get '/login' do
  # "login page"
  erb :login
end

end
