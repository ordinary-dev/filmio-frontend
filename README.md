# Film.io
Your personal album, but you can only upload 36 photos.

## Configuration
You can create the file named `.env.local` and change the default settings.
```
BACKEND_IP=localhost
BACKEND_PORT=8000
```
See also: [Film.io backend server](https://github.com/ordinary-dev/filmio-backend)

## How to build and run
* Native
```
npm install
npm run build
npm start
```
* Docker:
```
docker build -t filmio -f production.Dockerfile .
docker run -p '3000:3000' filmio
```
