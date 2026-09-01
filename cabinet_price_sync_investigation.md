# 4x10 Cabinet Price Synchronization Investigation

Shopify Admin verified that the **4x10 Oval Open-Back Speaker Cabinet** variant was updated to **$999 USD**.

The public Edwards product page still returned the former **$229 USD** fallback because its catalog API response includes only the nine older amplifier product keys and no cabinet products. The Vercel configuration routes all `/api/*` requests to `https://edwardsamps-production.up.railway.app/api/*`, so the public catalog endpoint is served by the Railway backend rather than the Vercel frontend deployment.

The Railway dashboard confirms that the `EdwardsAmps` service is connected to `OrioleMarketing/EdwardsAmps` on the `main` branch. However, **Auto deploy is disabled**. The manually approved redeploy rebuilt the same nine-day-old revision, which cannot include the later expanded catalog code. The required next step is to enable automatic deployment (or otherwise deploy the current `main` revision) so Railway receives the code already live on the Vercel frontend.
