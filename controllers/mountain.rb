class MountainController < ApplicationController

  get '/' do
    authorization_check
    erb :mt_search
  end

  post '/results' do
    "Hello there"
    erb :results
    <script type="text/javascript">
     myfunction();
     </script>
  end

  get '/mountain' do
    authorization_check
    @mountains = Mountain.all
    @mountains.to_json
  end

end
