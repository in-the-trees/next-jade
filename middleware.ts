import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
   const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
   const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
      style-src 'self' 'nonce-${nonce}';
      img-src 'self' blob: data: https://micro.blog https://jade.micro.blog;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
   `;
   // Replace newline characters and spaces
   const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, " ")
      .trim();

   const requestHeaders = new Headers(request.headers);
   requestHeaders.set("x-nonce", nonce);

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

   console.log(response);
   return response;
}
