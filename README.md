# Film.io
Your personal album, but you can only upload 36 photos.

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
