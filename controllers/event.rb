class EventController < ApplicationController

  get '/' do
    authorization_check
    erb :saved
  end

  get '/new' do
    authorization_check
    erb :new
  end

  get '/remove' do
    authorization_check
    erb :remove
  end

  get '/mountain_page' do
    'mountain page'
  end

  get '/saved' do
    erb :saved
  end

  get '/:id' do
    authorization_check
    @mtn= Mountain.find(params[:id])
    @mtn.id
    erb :list
  end

  post 'events/save' do
    @event = Event.new
    @event.day = params[:date]
    @event.event_name = params[:name]
    @event.event_url = params[:url]
    @event.event_user_id = session[:current_user].id
    @event.event_mountain_id = 1
    @event.save
    erb :new
  end

  get '/events/save' do
    @saved = Event.all
    erb :saved
  end


end
