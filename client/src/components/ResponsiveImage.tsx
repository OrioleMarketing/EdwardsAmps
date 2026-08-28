type ResponsiveImageProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  className: string;
  pictureClassName?: string;
  priority?: boolean;
};

export default function ResponsiveImage({
  desktopSrc,
  mobileSrc,
  alt,
  className,
  pictureClassName = "block",
  priority = false,
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" /> : null}
      <img
        src={desktopSrc}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
      />
    </picture>
  );
}
