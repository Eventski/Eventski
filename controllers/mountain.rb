class MountainController < ApplicationController

  get '/mountain' do
    @mountains = Mountain.all
    @mountains.to_json
    
  end

end
