import { useEffect, useRef, useState } from "react";

type ResponsiveImageProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  className: string;
  pictureClassName?: string;
  priority?: boolean;
  loadingStrategy?: "eager" | "lazy";
};

export default function ResponsiveImage({
  desktopSrc,
  mobileSrc,
  alt,
  className,
  pictureClassName = "block",
  priority = false,
  loadingStrategy,
}: ResponsiveImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    setStatus("loading");
    if (imageRef.current?.complete) {
      setStatus(imageRef.current.naturalWidth > 0 ? "loaded" : "error");
    }
  }, [desktopSrc, mobileSrc]);

  return (
    <span className={`image-loading-shell ${pictureClassName}`} data-loaded={status !== "loading"}>
      <span className="image-loading-shimmer" aria-hidden="true" />
      <picture className="block h-full w-full">
        {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" /> : null}
        <img
          ref={imageRef}
          src={desktopSrc}
          alt={alt}
          className={className}
          loading={loadingStrategy ?? (priority ? "eager" : "lazy")}
          decoding="async"
          fetchPriority={priority || loadingStrategy === "eager" ? "high" : "low"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      </picture>
    </span>
  );
}
