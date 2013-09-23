require 'test_helper'

class NoisesControllerTest < ActionController::TestCase
  setup do
    # @noise = noises(:one)
    @noise = FactoryGirl.create(:noise)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:noises)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create noise" do
    assert_difference('Noise.count') do
      post :create, noise: { coordinates_latitude: @noise.coordinates_latitude, coordinates_longitude: @noise.coordinates_longitude, text: @noise.text, twitter_id: @noise.twitter_id }
    end

    assert_redirected_to noise_path(assigns(:noise))
  end

  test "should show noise" do
    get :show, id: @noise
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @noise
    assert_response :success
  end

  test "should update noise" do
    put :update, id: @noise, noise: { coordinates_latitude: @noise.coordinates_latitude, coordinates_longitude: @noise.coordinates_longitude, text: @noise.text, twitter_id: @noise.twitter_id }
    assert_redirected_to noise_path(assigns(:noise))
  end

  test "should destroy noise" do
    assert_difference('Noise.count', -1) do
      delete :destroy, id: @noise
    end

    assert_redirected_to noises_path
  end
end