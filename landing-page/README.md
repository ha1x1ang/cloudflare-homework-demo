# Landing Page Worker

This Cloudflare Worker serves as a simple landing page for Zero Trust login applications.

## Purpose

- Provides a branded welcome screen at `/landing`
- Links to a protected Zero Trust route at `/secure`
- Designed to work with domain: `https://tunnel.ha1x1angwebsite.com/landing`

## How to Deploy

1. Make sure your domain is managed by Cloudflare and Tunnel is configured.
2. Configure your index.js file.
3. Fill in your `account_id` and `zone_id` in `wrangler.toml`.
4. Run:

wrangler deploy

Then you can test it by typing the following domain in the browser

https://tunnel.ha1x1angwebsite.com/landing
