class UserController < ApplicationController

get '/' do
  "Hello World"
end

get '/login' do
  # "login page"
  erb :login
end

end
