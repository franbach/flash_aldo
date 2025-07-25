# Flash Aldo

![Demo](demo.gif)

## Instructions

1. brew install websocketd
2. chmod +x inventory.rb
3. bundle install (backend folder) - make sure you have the proper ruby version installed
4. npm run install (frontend folder)

### Make sure to start the processes in this respective order: the order matters :)

1. broadcaster, in the broadcaster folder run `websocketd --port=8080 inventory.rb`
2. backend folder `rails s`
3. frontend folder `npm run dev`

### Original concept

- [Link](https://github.com/mathieugagne/shoe-store)
