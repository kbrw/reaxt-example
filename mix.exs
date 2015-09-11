defmodule ReaxtExample.Mixfile do
  use Mix.Project

  def project do
    [app: :reaxt_example,
     version: "0.0.1",
     elixir: "~> 1.0",
     compilers: [:reaxt_webpack] ++ Mix.compilers,
     deps: deps]
  end

  def application do
    dev_apps = Mix.env == :dev && [:reprise] || []
    [applications: [:logger,:reaxt,:plug,:cowboy,:eex] ++ dev_apps,
     mod: {ReaxtExample.App,[]}]
  end

  defp deps do
    [{:reaxt, "~> 0.3.0"},
     {:reprise, "~> 0.3.0", only: :dev},
     {:cowboy,"~> 1.0.0"}]
  end
end
