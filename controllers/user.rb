class UserController < ApplicationController

get '/' do
  "Hello World"
  erb :event
end

get '/login' do
  # "login page"
  erb :login
end

end
