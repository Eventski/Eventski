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

  get '/mountain_page' do
    'mountain page'
  end

  get '/saved' do
    erb :saved
  end

  get '/:id' do
    @mtn= Mountain.find(params[:id])
    @mtn.id
    erb :list
  end

  post '/save' do

  end

end
