import { CheckCircle2, MessageSquareQuote } from "lucide-react";
import { getVerifiedProductReviews } from "@shared/verifiedProductReviews";

export default function VerifiedReviews({ productKey, productName }: { productKey: string; productName: string }) {
  const reviews = getVerifiedProductReviews(productKey);

  return (
    <section className="mt-8 overflow-hidden border border-white/10 bg-card/35" aria-labelledby="customer-reviews-heading">
      <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="section-kicker">Customer reviews</p>
          <h2 id="customer-reviews-heading" className="mt-4 font-display text-4xl leading-tight text-foreground">Feedback from players, when it is ready to share.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-foreground/68">Only verified and approved customer feedback is shown here.</p>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <figure key={review.id} className="border border-white/10 bg-black/20 p-6">
                <MessageSquareQuote className="h-5 w-5 text-primary" aria-hidden="true" />
                <blockquote className="mt-4 text-lg leading-8 text-foreground/82">“{review.quote}”</blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.68rem] uppercase tracking-[0.2em] text-foreground/55">
                  <span>{review.author}{review.location ? ` · ${review.location}` : ""}</span>
                  <span className="inline-flex items-center gap-1.5 text-primary/80"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />Verified customer</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="flex min-h-44 flex-col justify-center border border-white/10 bg-black/20 p-6 sm:p-8">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-primary/80">Verified feedback</p>
            <p className="mt-4 max-w-xl font-display text-2xl leading-snug text-foreground/88">Customer reviews for {productName} will appear here as they are verified and approved.</p>
          </div>
        )}
      </div>
    </section>
  );
}
