class MountainController < ApplicationController


  get '/' do
    authorization_check
    erb :mt_search
  end

  get '/mountain' do
    authorization_check
    @mountains = Mountain.all
    @mountains.to_json
  end



end
