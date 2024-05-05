import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
   const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' ${
         process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
      };
      style-src 'self';
      img-src 'self' blob: data: https://micro.blog https://jade.micro.blog;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""};
   `;
   // Replace newline characters and spaces
   const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, " ")
      .trim();

   const requestHeaders = new Headers(request.headers);
   requestHeaders.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue,
   );

   const response = NextResponse.next({
      request: {
         headers: requestHeaders,
      },
   });
   response.headers.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue,
   );

   response.headers.set("X-XSS-Protection", "0");
   response.headers.set("X-Content-Type-Options", "nosniff");
   response.headers.set("X-Frame-Options", "DENY");
   response.headers.set("Referrer-Policy", "no-referrer");

   return response;
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      {
         source:
            "/((?!api|_next/static|_next/image|favicon.ico|icon.png.*|apple-icon.png.*).*)",
         missing: [
            { type: "header", key: "next-router-prefetch" },
            { type: "header", key: "purpose", value: "prefetch" },
         ],
      },
   ],
};
