class MountainController < ApplicationController



  get '/mountain' do
    @mountains = Mountain.all
    puts @mountains
    erb :mountain
  end

end
