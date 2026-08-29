export type VerifiedProductReview = {
  id: string;
  quote: string;
  author: string;
  location?: string;
  verifiedPurchase: true;
};

/**
 * This source intentionally contains no sample reviews. Entries may be added only
 * after a real customer review has been verified and approved for publication.
 */
export const VERIFIED_PRODUCT_REVIEWS_BY_KEY: Readonly<Partial<Record<string, readonly VerifiedProductReview[]>>> = {};

export function getVerifiedProductReviews(productKey: string): readonly VerifiedProductReview[] {
  return VERIFIED_PRODUCT_REVIEWS_BY_KEY[productKey] ?? [];
}
