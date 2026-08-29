import { describe, expect, it } from "vitest";
import { getVerifiedProductReviews, VERIFIED_PRODUCT_REVIEWS_BY_KEY } from "../shared/verifiedProductReviews";

describe("verified product reviews", () => {
  it("does not seed or fabricate customer review content", () => {
    expect(Object.values(VERIFIED_PRODUCT_REVIEWS_BY_KEY).flat()).toEqual([]);
    expect(getVerifiedProductReviews("evil-grin-fuzz-pedal")).toEqual([]);
  });
});
