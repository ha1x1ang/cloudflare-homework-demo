/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 获取 Cloudflare Access 注入的身份信息
    const email = request.headers.get("cf-access-authenticated-user-email");
    const country = request.headers.get("cf-ipcountry");
    const now = new Date().toISOString();

    // ✅ 访问国旗图片：/secure/XX 或 /login/XX
    const parts = pathname.split("/");
    if (
      (pathname.startsWith("/secure/") || pathname.startsWith("/login/")) &&
      parts.length === 3
    ) {
      const countryCode = parts[2].toUpperCase();
      try {
        const object = await env.FLAGS_BUCKET.get(`${countryCode}.png`);
        if (!object) {
          return new Response("Flag not found", { status: 404 });
        }

        return new Response(object.body, {
          headers: {
            "Content-Type": "image/png",
          },
        });
      } catch (e) {
        return new Response("Error loading flag", { status: 500 });
      }
    }

    // ✅ /secure 页面
    if (pathname === "/secure") {
      if (!email) {
        return new Response("Unauthorized", { status: 401 });
      }

      const html = `
        <html>
          <body>
            <h1>${email} authenticated at ${now} from 
              <a href="/secure/${country}">${country}</a>
            </h1>
          </body>
        </html>
      `;
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // ✅ /login 页面：展示同样信息
    if (pathname === "/login") {
      if (!email) {
        return new Response("Unauthorized", { status: 401 });
      }

      const html = `
        <html>
          <body>
            <h1>${email} authenticated at ${now} from 
              <a href="/login/${country}">${country}</a>
            </h1>
          </body>
        </html>
      `;
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // 默认 404
    return new Response("Not Found", { status: 404 });
  },
};

