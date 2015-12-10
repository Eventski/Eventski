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

  # get '/mountain_page' do
  #   'mountain page'
  # end
  #
  get '/saved' do
    erb :saved
  end

  get '/:id' do
    authorization_check
    @mtn= Mountain.find(params[:id])
    @mtn.id
    erb :list
  end

  post '/save' do
  # post 'events/save' do -------this breaks the save to table ability
    @event = Event.new
    @event.day = params[:date]
    @event.event_name = params[:name]
    @event.event_url = params[:url]
    @event.event_user_id = session[:current_user].id
    @event.event_mountain_id = params[:mtn]
    @event.save
    erb :new
  end

  # get '/save' do
  get '/events/save' do
   @saved = Event.where(event_user_id: session[:current_user].id)
   erb :saved
 end

  get '/events/destroy/:id' do
    @saved = Event.find(params[:id])
    @saved.id
    erb :saved
  end

  post '/events/destroy' do
    'testing'
    @saved = Event.find(params[:id])
    @saved.destroy
    # redirect ('/events/save')
    # erb :saved
  end

end
