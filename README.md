Reaxt Example
=============

Test it now (need npm and elixir):

```elixir
git clone https://github.com/awetzel/reaxt-example
cd reaxt-example
mix local.hex --force
mix local.rebar --force
mix deps.get --force
mix compile --force
mix webpack.compile --force 
iex -S mix
```
Or with use of a dockerfile:

```dockerfile
FROM alpine
RUN apk add elixir npm nodejs git
RUN git clone https://github.com/awetzel/reaxt-example
WORKDIR reaxt-example
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get --force
RUN mix compile --force
RUN mix webpack.compile --force 
CMD ["iex", "-S", "mix"]
# docker build -t alpine_reaxt .
# docker run -it --name ReaxtExample -p 8099:8099 alpine_reaxt
```

Then :
- go to http://localhost:8099 to see an example application,
- you can test hot loading by changing a react template in `web/components/xx`,
  or the css in `web/css/app.css`.

