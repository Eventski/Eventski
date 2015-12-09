class MountainController < ApplicationController

  get '/' do
    erb :mt_search
  end

  post '/results' do
    "Hello there"
    erb :results
  end

  get '/mountain' do
    @mountains = Mountain.all
    @mountains.to_json
  end

end
