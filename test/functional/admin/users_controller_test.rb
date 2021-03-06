require "test_helper"

class Admin::UsersControllerTest < ActionController::TestCase
  setup do
    @user = FactoryGirl.create(:user)
  end

  test "user should not show user" do
    sign_in(FactoryGirl.create(:admin_user))

    get :show, id: @user
    assert_response :success
  end

  test "admin should get index" do
    sign_in(FactoryGirl.create(:admin_user))

    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "user should not get new" do
    sign_in(FactoryGirl.create(:user))

    get :new
    assert_redirected_to :root
  end

  test "admin should get new" do
    sign_in(FactoryGirl.create(:admin_user))

    get :new
    assert_response :success
  end

  test "should follow account" do
    Sidewalks::Informants::Twitter.client.expects(:follow).returns(true)

    sign_in(FactoryGirl.create(:admin_user))

    post :create, user: { provider: Noise::PROVIDER_TWITTER, provider_screen_name: Faker::Internet.user_name }

    assert_redirected_to admin_users_path
  end

  test "user should not get edit" do
    sign_in(FactoryGirl.create(:user))

    get :edit, id: @user
    assert_redirected_to :root
  end

  test "admin should get edit" do
    sign_in(FactoryGirl.create(:admin_user))

    get :edit, id: @user
    assert_response :success
  end

  test "user should not update user" do
    sign_in(FactoryGirl.create(:user))

    put :update, id: @user, user: { provider: @user.provider, provider_id: @user.provider_id }
    assert_redirected_to :root
  end

  test "admin should update user" do
    sign_in(FactoryGirl.create(:admin_user))

    put :update, id: @user, user: { provider: @user.provider, provider_id: @user.provider_id }
    assert_redirected_to admin_user_path(assigns(:user))
  end
end
