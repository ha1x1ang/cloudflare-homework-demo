# Cloudflare Homework Demo Projects

This repository contains a collection of hands-on demo projects exploring basic Web server establish, Cloudflare Domain creation, DNS and proxy configuration, Zero Trust, Workers, Access Policies, and Tunnel integrations.

It is intended to demonstrate real-world use cases and practical configurations that showcase how to build secure, identity-aware, and customizable edge applications with Cloudflare's platform.

---

## 🔧 Prerequisites

Before using any of these demos, make sure you have:

- A platform of your choosing which could server as a web server
- A Cloudflare account (Free is fine)
- A domain managed by Cloudflare DNS (e.g., `ha1x1angwebsite.com`)
- `wrangler` CLI installed (`npm install -g wrangler`)
- An Access application and IdP (e.g. Google or OTP) configured under [Zero Trust Dashboard](https://dash.cloudflare.com)

---

## 📁 Project Structure

### `landing-page/`

A Cloudflare Worker that serves a public, branded landing page at `/landing`, which links to a Zero Trust-protected resource at `/secure`.

- 📌 Route: `https://tunnel.ha1x1angwebsite.com/landing`
- 🎯 Use case: Welcome page before access-controlled apps
- 🔒 Integrates with Access policies via `/secure`

[See README →](./landing-page/README.md)

---

### `my=worker/`

A test application demonstrating OTP-based and GoogleSSO Zero Trust login flows and policy behavior (e.g., allow certain domains, test block pages).

- 📌 Includes Access policies: `Allow email is near@gmail.com`, `Allow email ends with @cloudflare.com`
- 📨 Validates OTP delivery behavior
- 🧪 Useful for verifying Zero Trust email policy logic

---


