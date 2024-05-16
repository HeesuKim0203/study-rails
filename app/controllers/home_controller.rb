class HomeController < ApplicationController
    def index # Action
        @time = Time.current
    end
end
