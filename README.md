# Honest Reviews

Honest Reviews is a sample app for Swell.

Swell Apps is currently in closed alpha phase, available to select partners. Read more in the (alpha documentation)[https://www.notion.so/swellcorp/Swell-Apps-4dc8e6e696e14778973a8e5a1bc3575c?pvs=4].


## Getting Started

During alpha and beta phases, you'll install a local copy of the app in your own store using the CLI. This allows you to make changes to the code and help improve things for the community. Pull requests welcome.

1. Clone this repository.
2. Install the Swelll CLI.

```bash
npm install @swell/cli@alpha
```

3. Log in and push the app to your test store.

```bash
cd /path/to/honest-reviews-app

swell login

swell app push
```

## Storefront setup

Honest Reviews is bundled with a (Next.js 14)[https://nextjs.org/blog/next-14] app that shows how a frontend can integrate with models, fetch data and interact with app functions.

1. In the Swell dashboard, navigate to `Developer > API keys` and create a public key with permissions for Honest Reviews. Enter your store ID and public key in `/path/to/honest-reviews-app/storefront/.env.local`.

```
NEXT_PUBLIC_SWELL_STORE_ID=...
NEXT_PUBLIC_SWELL_STORE_KEY=pk_test_...
```

5. Install dependencies and run it locally.

```bash
cd storefront/

npm install

npm run dev
```

## Important note

The app isn't ready for production use at this time, but should serve as an example with code patterns you can learn from. 

## Contributing

Contributions are welcome! Visit the [Swell Discord](https://discord.gg/9XcDSwbj) channel or [GitHub discussions](https://github.com/orgs/swellstores/discussions/) to ask questions and share ideas.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.