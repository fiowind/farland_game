# bcf-us-ui

#### Install dependencies

```shell
npm install
```

Configure nextjs to use a CDN to host the static assets in the bucket:

Replace _BUCKET_NAME_ with your own bucket name. Don't manually create the bucket, the plugin will do that for you.

_next.config.js_

```js
module.exports = {
  ...
  assetPrefix: "https://s3.amazonaws.com/BUCKET_NAME"
};
```

Alternatively, remove `assetPrefix` and the bucket won't be provisioned.

#### Running locally

`npx serverless offline`

#### Deploy

`serverless deploy`

After deployment is finished, go to the API GW provisioned by serverless and you should be able to hit `dev/home` and `dev/about` pages.
# farland_game
