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

  get '/:id' do
    @mtn= Mountain.find(params[:id])
    @mtn.id
    erb :list
  end

end
