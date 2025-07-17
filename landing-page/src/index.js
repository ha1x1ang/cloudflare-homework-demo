/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Welcome</title>
        <style>
          body {
            background: #f8f9fa;
            font-family: sans-serif;
            text-align: center;
            padding: 80px;
          }
          h1 { color: #333; }
          p { font-size: 16px; color: #555; }
          .button {
            margin-top: 30px;
            background-color: #0052cc;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to the Secure Portal</h1>
        <p>Please click the button below to continue.</p>
        <a class="button" href="/secure">Login</a>
      </body>
      </html>
    `, {
      headers: { "content-type": "text/html" },
    });
  },
};

