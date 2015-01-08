Reaxt Example
=============

Test it now (need npm and elixir): 

```elixir
git clone https://github.com/awetzel/reaxt-example
cd reaxt-example
mix deps.get
iex -S mix
```

Then :  
- go to http://localhost:4000 to see an example application, 
- you can test hot loading by changing a react template in `web/components/xx`,
  or the css in `web/css/index.css`.
- you can see the webpack UI in http://localhost:4000/webpack
- you can test the javascript exception converted into elixir in http://localhost:4000/with_stacktrace
- then just analyse and understand the `reaxt` usage
