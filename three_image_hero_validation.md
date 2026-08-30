# Three-Image Hero Validation

The homepage hero now presents a three-card product pathway in the required order: **Amplifiers**, **Pedals**, and **Speaker cabinets**. Each card links to the existing Shop results and selects its matching category filter before the Shop anchor is reached.

| Hero card | Image treatment | Source decision |
| --- | --- | --- |
| Amplifiers | Full approved Elusive Overdrive workbench scene | Retains the approved staged amplifier photography. |
| Pedals | Real client-supplied Elusive Overdrive pedal photo | Uses an existing, approved product image already selected for the catalog. |
| Speaker cabinets | Cropped speaker-grille detail from the approved Elusive Overdrive workbench scene | Shopify and the reviewed client library contain no dedicated, accurately labeled cabinet photo. The treatment uses only an existing approved Edwards image and does not invent or misrepresent a new cabinet product visual. |

Desktop and 390px mobile captures confirm the three cards appear in order, use stable image frames, and retain the dark Edwards visual system. The category model is covered by the Shop-filter unit test. TypeScript, the full 17-test suite, and the production build passed.
