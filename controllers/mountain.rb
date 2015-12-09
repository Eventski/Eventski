class MountainController < ApplicationController

  get '/' do
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
    @mountains = Mountain.all
    @mountains.to_json
  end

end
