# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'sidewalks'
set :repo_url, 'git@github.com:ajsharma/sidewalks.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/apps/sidewalks'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
# set :rvm, '2.0.0-p247'

# Default value for keep_releases is 5
# set :keep_releases, 5

set :bundle_flags, "--deployment"

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  task :configure_symlinks do
    on roles(:all) do 
      execute "cp #{shared_path}/config/application.yml #{release_path}/config/application.yml"
      execute "cp #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    end
  end

before "deploy:assets:precompile", :configure_symlinks

end