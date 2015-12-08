require 'sinatra/base'

require('./controllers/application')
require('./controllers/event')
require('./controllers/mountain')
require('./controllers/user')
require('./models/account_model')
require('./models/event_model')
require('./models/mountain_model')

map('/') {run UserController}
map('/mountains') {run MountainController}
map('/events') {run EventController}
