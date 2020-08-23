R - CHNWT
=========

R - CHNWT is a URL shortener to reduce a long link.

API
---
This API is based on HTTPS / JSON requests and responses. `https://r.chnwt.dev`

### Create a shortened URL

##### API request
`POST /url`
<details>
<summary>JSON</summary>

```json
{
    "url": "[:fullURL]"
}
```
</details>

##### API response
<details>
<summary>JSON</summary>

```json
{
    "status": "success",
    "id": "[:id]",
    "shortUrl": "https://r.chnwt.dev/[:id]",
    "fullUrl": "[:fullURL]"
}
```
</details>

### Create a shortened URL with custom alias

##### API request
`POST /url`
<details>
<summary>JSON</summary>

```json
{
    "url": "[:fullURL]",
    "customPath": "[:customPath]"
}
```
</details>

##### API response
<details>
<summary>JSON</summary>

```json
{
    "status": "success",
    "id": "[:customPath]",
    "shortUrl": "https://r.chnwt.dev/[:customPath]",
    "fullUrl": "[:fullURL]"
}
```
</details>

### Shortened URL redirect

##### HTTPS request
`GET /[:id]`

##### HTTPS response
`Redirect to full URL`

_____

## Requirements

- Node LTS

## Installation

```sh
$ npm install
$ npm run start
```

or

```sh
$ yarn
$ yarn start
```

## Config

create .env file

```
# My domain / IP address

MY_URL=''

# Firebase Config

FIREBASE_COLLECTION_NAME=''

FIREBASE_API_KEY=''

FIREBASE_APP_ID=''

FIREBASE_PROJECT_ID=''

FIREBASE_DATABASE_URL=''
```
