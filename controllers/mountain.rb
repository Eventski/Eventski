class MountainController < ApplicationController

<<<<<<< HEAD

=======
  get '/' do
    authorization_check
    erb :mt_search
  end

  post '/results' do
    "Hello there"
    erb :results
  end
>>>>>>> 930c9cd1d8e157443963f25129cd0bd9f87d75b3

  get '/mountain' do
    authorization_check
    @mountains = Mountain.all
    @mountains.to_json
  end

end
