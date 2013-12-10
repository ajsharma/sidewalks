class Origin < ActiveRecord::Base
  belongs_to :noise
  
  attr_accessible :latitude, :longitude

  reverse_geocoded_by :latitude, :longitude

  def self.where_search(params)
    latitude = params[:latitude]
    longitude = params[:longitude]
    location = params[:location]
    distance = params[:distance] || 1.5

    if latitude && longitude
      search_location = [latitude, longitude]
    elsif location
      search_location = location
    end

    if search_location
      near(search_location, distance)
    end

    scoped
  end
end
