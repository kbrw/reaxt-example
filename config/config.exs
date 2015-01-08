use Mix.Config

config :reaxt, :otp_app, :reaxt_example
config :reaxt, :hot, if(Mix.env == :dev, do: :client, else: false)
config :reaxt, :pool_size, if(Mix.env == :dev, do: 1, else: 10)
