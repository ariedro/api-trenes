# SOFSE Trains Obscurated API Bypasser

This project aims to make public access of SOFSE's Trains API,
bypassing the security through obscurity of the internal API.

All the endpoints and params are the same of the original service,
this is just a proxy that makes the authentication process available for public usage.

This was possible by scrapping the code inside the SOFSE Trains Android app,

[Here's a blog post](https://ariedro.dev/3-hack-trains-api/) describing what was the process behind this.

## Public instances

- [ariedro.dev](https://ariedro.dev/api-trenes)

## Usage example

The result of these queries can be piped to something like `jq` for better formatting

Get stations that start with "Migue"

```sh
curl 'https://ariedro.dev/api-trenes/infraestructura/estaciones?nombre=Migue'
```

Get all info from station Miguelete (Warning: Heavy payload)

```sh
curl 'https://ariedro.dev/api-trenes/arribos/estacion/271'
```

Get 3 train schedules to go from "Miguelete" to "Drago" today at 08:32

```sh
curl 'https://ariedro.dev/api-trenes/arribos/estacion/271?hasta=236&fecha=2025-03-25&hora=08:32&cantidad=3'
```

## Documentation

[Here](https://trenes.sofse.apidocs.ar/)  you can find a detailed documentation for the endpoints. Thanks to [Enzo Notario](https://github.com/enzonotario).

## Install

Just install and start

```sh
$ npm install
$ npm run start
```
