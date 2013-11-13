class TwitterNoiseImporter

  IMPORT_LOCK_KEY_NAME = 'import_lock'

  def self.import_latest_from_sidewalks_twitter 
    # Import the latest noises from twitter and saves to db

    unless Rails.cache.exist?(TwitterNoiseImporter::IMPORT_LOCK_KEY_NAME)
      self.latest_noises_from_sidewalks_twitter.each do |tweet|
        begin
          user = User.first_or_import_from_twitter_noise_user(tweet.user)
          Noise.first_or_import_from_twitter_noise(tweet, user)
        rescue => exception
          logger.error exception
        end
      end

      Rails.cache.write(TwitterNoiseImporter::IMPORT_LOCK_KEY_NAME, true, expires_in: 5.minutes)
    end
  end

  def self.latest_noises_from_sidewalks_twitter
    last_noise = Noise.last

    begin 
      if last_noise && last_noise.provider_id
        Twitter.home_timeline({since_id: last_noise.provider_id})
      else
        Twitter.home_timeline
      end
    rescue => exception
      logger.error exception
      return []
    end
  end

end