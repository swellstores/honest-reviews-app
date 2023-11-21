# Honest Reviews storefront example

Honest Reviews is a sample app for Swell developers to learn from.

This project is an example to help you understand how to get started building your own frontend integrations. It's meant to be simple, while covering the basics of retrieving app data and interacting with app functions.

## Getting Started

During the Alpha and Beta phases of Swell Apps, you will install a local copy of the app in your own store using the CLI. This allows you to make changes to the code and help improve things for the community, if you will. Pull requests welcome!

1. Clone this repository.
2. Install the Swelll CLI.

```bash
npm install @swell/cli-2
```

3. Log in and push the app to your test store.

```bash
cd /path/to/honest-reviews-app
swell login
swell app push
```

4. In the Swell dashboard, navigate to `Developer > API keys` and create a public key with permissions for Honest Reviews. Enter your store ID and public key in `/path/to/honest-reviews/app/storefront/.env.local`.

```
NEXT_PUBLIC_SWELL_STORE_ID=...
NEXT_PUBLIC_SWELL_STORE_KEY=pk_test_...
```

5. Install dependencies and run the storefront app locally.

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