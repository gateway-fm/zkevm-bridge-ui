import { baseBrand } from "src/brands/base";
import { Brand } from "src/brands/brand";
import { teizaBrand } from "src/brands/teiza";

// Registry of all supported brands, keyed by the value of `VITE_BRAND`.
// Add a client here + a `src/brands/<id>.ts` module to onboard a new white-label.
const brands: Record<string, Brand> = {
  base: baseBrand,
  teiza: teizaBrand,
};

// The active brand, resolved at BUILD time from `VITE_BRAND`. Unset / unknown
// values fall back to the default Gateway brand, so existing builds are
// unaffected. Docker builds pass `--build-arg VITE_BRAND=<id>`.
const brandId = typeof import.meta.env.VITE_BRAND === "string" ? import.meta.env.VITE_BRAND : "base";

export const brand: Brand = brands[brandId] ?? baseBrand;

export type { Brand } from "src/brands/brand";
