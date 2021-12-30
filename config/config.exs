use Mix.Config

config :reaxt, [
  otp_app: :reaxt_example,
  hot: Mix.env == :dev,
  pool_size: if Mix.env == :dev do 1 else 10 end
]
