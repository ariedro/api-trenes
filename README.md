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

Get all lines

```sh
curl 'https://ariedro.dev/api-trenes/lineas'
```

Get stations of line 5

```sh
curl 'https://ariedro.dev/api-trenes/estaciones/buscar?lineas=5'
```

Get the train schedules to go from "Drago" to "Miguelete"

```sh
curl 'https://ariedro.dev/api-trenes/estaciones/236/horarios?hasta=271'
```

Get the train schedules to go from "Drago" to "Miguelete", filtering only the arrival time

```sh
curl 'https://ariedro.dev/api-trenes/estaciones/236/horarios?hasta=271&fields=results%28desde%28llegada'
```

## Endpoints

These are some of the endpoints that I've scrapped from the app,
I don't know which of the parameters are required and how it works exactly,
I'll probably complete more this documentation once I get to test it better.

### GET `/estaciones/{id}`

#### Parameters

| Name | Located in | Type    |
| ---- | ---------- | ------- |
| `id` | path       | integer |

### GET `/estaciones/{id}/horarios`

#### Parameters

| Name            | Located in | Type      |
| --------------- | ---------- | --------- |
| `id`            | path       | integer   |
| `hasta`         | query      | integer   |
| `fields`        | query      | string    |
| `lineas`        | query      | integer[] |
| `ramales`       | query      | integer[] |
| `cabeceraFinal` | query      | integer[] |
| `servicio`      | query      | integer   |
| `fecha`         | query      | string    |
| `tipo`          | query      | string    |
| `limit`         | query      | integer   |

### GET `/estaciones/{id}/horarios/groups`

#### Parameters

| Name     | Located in | Type      |
| -------- | ---------- | --------- |
| `id`     | path       | integer   |
| `fields` | query      | string    |
| `lineas` | query      | integer[] |

### GET `/estaciones/cercanas`

#### Parameters

| Name      | Located in | Type      |
| --------- | ---------- | --------- |
| `lat`     | query      | double    |
| `lon`     | query      | double    |
| `radio`   | query      | integer   |
| `limit`   | query      | integer   |
| `lineas`  | query      | integer[] |
| `ramales` | query      | integer[] |
| `exclude` | query      | integer[] |
| `orderBy` | query      | string    |
| `fields`  | query      | string    |

### GET `/estaciones/buscar`

#### Parameters

| Name      | Located in | Type      |
| --------- | ---------- | --------- |
| `nombre`  | query      | string    |
| `ids`     | query      | integer[] |
| `lineas`  | query      | integer[] |
| `ramales` | query      | integer[] |
| `exclude` | query      | integer[] |
| `limit`   | query      | integer   |
| `orderBy` | query      | string    |

### GET `/lineas`

#### Parameters

| Name     | Located in | Type      |
| -------- | ---------- | --------- |
| `ids`    | query      | integer[] |
| `lineas` | query      | integer[] |
| `limit`  | query      | integer   |
| `fields` | query      | string    |

### GET `/alertas`

No parameters

### GET `/alertas/viaje`

#### Parameters

| Name    | Located in | Type    |
| ------- | ---------- | ------- |
| `desde` | query      | integer |
| `hasta` | query      | integer |

### GET `/estaciones/{id}/alertas/geo`

#### Parameters

| Name    | Located in | Type    |
| ------- | ---------- | ------- |
| `id`    | path       | integer |
| `token` | query      | string  |

### GET `/lineas/{id}/alertas`

#### Parameters

| Name | Located in | Type    |
| ---- | ---------- | ------- |
| `id` | path       | integer |

## Install

Just install and start

```sh
$ npm install
$ npm run start
```
