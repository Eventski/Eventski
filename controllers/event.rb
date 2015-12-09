class EventController < ApplicationController

  get '/' do
    erb :saved
  end

  get '/new' do
    erb :new
  end

  get '/remove' do
    erb :remove
  end


end
