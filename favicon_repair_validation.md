# Public Favicon Repair Validation

The external EdwardsAmps.com deployment initially served an older Vercel build. Its document head contained no favicon link and both `/favicon.png` and `/favicon.ico` returned the SPA HTML fallback.

After synchronization to GitHub commit `298b5574463fdcfae8632e37261c3fc3dd56667b`, Vercel deployment `dpl_33oRkRJ2FYUvppHu86zRY3ekQs7k` reached `READY`. The public page now displays the current Shop filter layout and declares all standard icon links.

| Public asset | Response | Content type | Verified size |
| --- | --- | --- | ---: |
| `/favicon.ico` | `200` | `image/vnd.microsoft.icon` | 7,182 bytes |
| `/favicon.png` | `200` | `image/png` | 7,493 bytes |
| `/apple-touch-icon.png` | `200` | `image/png` | 11,847 bytes |

The browser may retain the earlier globe temporarily because favicons are aggressively cached per tab. A hard reload or a new tab will request the newly declared icon assets.
