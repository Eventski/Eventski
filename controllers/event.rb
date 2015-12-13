class EventController < ApplicationController

  get '/' do
    authorization_check
    erb :saved
  end

  get '/new' do
    authorization_check
    erb :new
  end

  get '/events/destroy/:id' do
     @saved = Event.find(params[:id])
     @saved.id
     erb :remove
   end

   post '/events/destroy' do
     @event = Event.find(params[:id])
     @event.destroy

     erb :remove

   end


  # get '/saved' do
  #   erb :saved
  # end

  get '/:id' do
    authorization_check
    @mtn= Mountain.find(params[:id])
    @mtn.id
    erb :list
  end

  post '/save' do
    @event = Event.new
    @event.day = params[:date]
    @event.event_name = params[:name]
    @event.event_url = params[:url]
    @event.event_user_id = session[:current_user].id
    @event.event_mountain_id = params[:mtn]
    @event.save
  end

  # get '/save' do
  get '/events/save' do
   @saved = Event.where(event_user_id: session[:current_user].id)
   erb :saved
 end

  get '/events/destroy/:id' do
    @saved = Event.find(params[:id])
    @saved.id
    @saved = Event.where(event_user_id: session[:current_user].id)

    erb :saved
  end

  post '/events/destroy' do
    'testing'
    @saved = Event.find(params[:id])
    @saved.destroy

  end

end
