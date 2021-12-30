defmodule ReaxtExample.App do
  use Application

  def start(_type, _args) do
    children = [
      {
        Plug.Cowboy,
        scheme: :http,
        plug: ReaxtExample.Api,
        options: [
          port: 8099,
        ]
      }
    ]
    _ = IO.puts("Starting server at http://localhost:8099")

    Reaxt.reload()
    Supervisor.start_link(children, [strategy: :one_for_one, name: __MODULE__])
  end
end

defmodule ReaxtExample.Api do
  require EEx
  use Plug.Router

  if Mix.env == :dev do
    use Plug.Debugger
    plug WebPack.Plug.Static, at: "/public", from: :reaxt_example
  else
    plug Plug.Static, at: "/public", from: :reaxt_example
  end

  plug :match
  plug :dispatch

  EEx.function_from_file :defp, :layout, "web/layout.html.eex", [:render]

  get "*_" do
    data = %{path: conn.request_path, cookies: conn.cookies, query: conn.params, headers: conn.req_headers}
    render = Reaxt.render!(:App, data, 30_000)

    conn
    |> put_resp_header("content-type", "text/html;charset=utf-8")
    |> send_resp(render.param || 200, layout(render))
  end
end
