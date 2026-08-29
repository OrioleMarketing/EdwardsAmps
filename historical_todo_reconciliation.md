# Historical TODO Reconciliation

This record reconciles the early project task history with the currently deployed Edwards storefront. The original list was not maintained during prior sessions, even though the work was completed and covered by later checkpoints.

| Historical workstream | Current verifiable evidence | Resolution |
| --- | --- | --- |
| Hero, customer-facing copy, and page rhythm | `Home.tsx` presents a real staged Elusive Overdrive hero, product-led copy, a five-amp lineup, and responsive sections without customer-facing implementation notes. | Completed. |
| Amp product pages and technical content | `App.tsx` routes all legacy amp pages; `AmpDetail.tsx` renders the shared page template and the exact required heading, “The technical side – at a glance.” | Completed. |
| Staged imagery and Jon Kammerer collaboration | `ampData.ts` maps all five approved scenes to direct responsive CDN images; `Home.tsx` retains the approved Jon Kammerer collaboration card and exact subtitle. | Completed. |
| Shop and ecommerce foundation | The Storefront API catalog, cart, cart page, all catalog mappings, and Shopify checkout handoff are present and have passed regression coverage. | Completed. |
| Earlier lineup-layout instructions | Two early instructions requested different image/copy positions; later approved instructions superseded them with the currently implemented full-width headline, image-left, copy-right composition. | Superseded by the current approved layout. |
| Shopify-only ordering test | The mapped Shopify-only products currently report unavailable for sale. The unavailable state and cart path are tested; a live add-to-cart transaction cannot be completed until Shopify marks an item available. | Resolved as an availability-dependent follow-up, not a site defect. |

The newly completed Shop category filter and verified-feedback-only review section remain tracked separately in the current history and were validated after this reconciliation.
