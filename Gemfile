source 'https://rubygems.org'
ruby '2.0.0'
gem 'rails', '~> 3.2'
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'compass-rails'  
end
gem 'jquery-rails'
gem 'bootstrap-sass'
gem 'cancan'
gem 'figaro'
gem 'omniauth'
gem 'omniauth-twitter'
gem 'pg'
gem 'rolify'
gem 'thin'
gem 'twitter'
group :development do
  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_19, :rbx]
  gem 'guard-bundler'
  gem 'guard-rails'
  gem 'rb-fchange', :require=>false
  gem 'rb-fsevent', :require=>false
  gem 'rb-inotify', :require=>false
end
group :development, :test do
  gem 'factory_girl_rails'
end
group :test do 
  gem 'rake' # for travis
end

# hosting
gem "heroku"

# code coverage
gem 'coveralls', require: false