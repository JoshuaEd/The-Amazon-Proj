# Copilot instructions

## Project overview

This is a dependency-free, browser-based Amazon storefront exercise. It is a static site rather than a bundled application or server-backed app.

- `amazon.html` is the product listing page. `scripts/app.js` imports `data/products.js` and `data/cart.js`, renders the product grid, and wires add-to-cart controls.
- `checkout.html` is the cart and checkout page. `scripts/checkout.js` joins cart entries to products, renders delivery choices, and handles delete/update interactions.
- `orders.html` and `tracking.html` are currently static HTML demonstrations. Their header links navigate between the pages, but they do not share a rendered order model with checkout.
- `data/products.js` is the JavaScript product catalog used by the interactive pages. `backend/products.json` is a duplicate JSON representation; update both when a change is intended to affect both data sources.
- `data/cart.js` is the shared cart state module. It persists the cart in `localStorage` under the `cart` key and exports the cart mutation helpers.
- `data/deliveryOptions.js` contains the three delivery choices. `lib/day.js` is a checked-in Day.js bundle, while checkout currently imports Day.js from the unpkg CDN.
- CSS is split into shared styles (`styles/shared/`) and page-specific styles (`styles/pages/`). Images are referenced by paths relative to the HTML document.

## Running the site

There is no `package.json`, build pipeline, test runner, or configured linter in this repository. Do not add npm commands to instructions or assume a bundler is available.

Because the pages use browser ES modules, serve the repository over HTTP rather than opening the HTML files directly. From the repository root on Windows, use:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000/amazon.html`. Stop the server with `Ctrl+C`.

There are no repository-defined test or lint commands, and no single-test command exists. Verify UI changes manually in the affected page(s), including checkout state persisted in `localStorage` when cart behavior changes.

## Implementation conventions

- Keep prices in integer cents in data objects and cart-related calculations. Use `scripts/utils/money.js` (`formatCurrency`) at display boundaries; do not store formatted dollar strings in product data.
- Use the product `id` as the cart item's `productId`. Interactive behavior depends on the existing `data-*` attributes and class naming convention, especially selectors such as `.quantity-label-${productId}`, `.quantity-save-${productId}`, and `.js-cart-item-container-${productId}`.
- When changing cart state, use the helpers in `data/cart.js` and preserve `saveToStorage()` so changes survive navigation/reload. Both `scripts/app.js` and `scripts/checkout.js` import the same module state in the browser.
- Keep browser code as native ES modules with relative imports for local modules. External libraries are loaded from CDN URLs in the HTML/module imports; do not introduce a package-manager dependency without also adding the required project setup.
- The checkout UI is generated from cart entries matched against `products.js`; delivery radio controls are generated from `deliveryOptions.js` and dates are calculated with Day.js. Changes to these models must preserve the matching IDs and the generated DOM hooks.
- Preserve the existing asset path style (`images/...`) and the shared/page-specific stylesheet layering when adding pages or components.
- Prefer the existing CSS grid and media-query patterns for responsive layouts. Shared typography, controls, buttons, and links belong in `styles/shared/`; page layout belongs in the corresponding file under `styles/pages/`.
- Keep HTML entry points at the repository root unless navigation and all relative asset/module paths are updated together.
