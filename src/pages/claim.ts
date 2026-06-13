import type { APIRoute } from "astro";

// The license-claim page lives on the licensing service, but receipts and
// memory will produce people typing conan.sh/claim — forward them, keeping
// the ?checkout_id= / ?order_id= query intact.
export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const dest = new URL("https://license.conan.sh/claim");
  dest.search = url.search;
  return new Response(null, {
    status: 301,
    headers: { Location: dest.toString() },
  });
};
