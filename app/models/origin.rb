# == Schema Information
#
# Table name: origins
#
#  id         :integer          not null, primary key
#  noise_id   :integer          not null
#  latitude   :decimal(11, 8)   not null
#  longitude  :decimal(11, 8)   not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_origin_on_latitude_and_longitude  (noise_id,latitude,longitude) UNIQUE
#

class Origin < ActiveRecord::Base
  belongs_to :noise
  has_one :user, :through => :noise
  
  attr_accessible :latitude, :longitude

  reverse_geocoded_by :latitude, :longitude

  def coordinates
    return [self.latitude, self.longitude]
  end

  def map 
    @map ||= Map.new([self.coordinates])
  end

  def directions_url
    "http://maps.google.com/maps?daddr=" + latitude.to_s + "," + longitude.to_s
  end

  def self.deduplicate
    # find all Origins and group them on keys which should be common
    grouped = all.group_by{ |origin| [origin.noise_id, origin.latitude, origin.longitude] }
    grouped.values.each do |duplicates|
      # the first one we want to keep right?
      first_one = duplicates.shift # or pop for last one
      # if there are any more left, they are duplicates
      # so delete all of them
      duplicates.each{|double| double.destroy} # duplicates can now be destroyed
    end
  end

  def self.where_ids(ids) 
    unless ids.nil?
      where(:id => ids)
    else
      scoped
    end
  end

  def self.where_latest
    where("#{table_name}.created_at >= ?", 12.hours.ago).order("#{table_name}.created_at DESC")
  end

  def self.where_nearby(params)
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
    else
      scoped
    end
  end

  def self.where_search(params)
    nearby_origin_ids = Origin.where_nearby(params)
      .where_latest
      .pluck(:id)

    where_ids(nearby_origin_ids)
      .order("#{table_name}.created_at DESC")
      .joins(:noise).preload(:noise) # cuz nearby overrides includes
      .joins(:user).preload(:user) # cuz nearby overrides includes
  end  
end
