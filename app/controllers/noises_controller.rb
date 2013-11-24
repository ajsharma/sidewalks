class NoisesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :nearby, :show, :import]
  before_filter :verify_admin, :except => [:index, :nearby, :show]
  before_filter :import_noises, :only => [:index, :nearby]

  respond_to :html, :json

  # GET /noises
  # GET /noises.json
  def index
    distance = params[:distance] || 1

    @noises = Noise.search(params).latest.all

    respond_with @noises
  end

  # GET /noises/1
  # GET /noises/1.json
  def show
    @noise = Noise.find(params[:id])

    respond_with @noise
  end

  def import 
    TwitterNoiseImporter.import_latest_from_sidewalks_twitter

    redirect_to root_path
  end

  # GET /noises/1/edit
  def edit
    @noise = Noise.find(params[:id])
  end

  # PUT /noises/1
  # PUT /noises/1.json
  def update
    @noise = Noise.find(params[:id])

    if @noise.update_attributes(params[:noise])
      flash[:notice] = 'Noise was successfully updated.'
    end

    respond_with @noise
  end

  # DELETE /noises/1
  # DELETE /noises/1.json
  def destroy
    @noise = Noise.find(params[:id])
    @noise.destroy

    flash[:notice] = 'Noise was successfully deleted.'

    respond_with @noise
  end
end
