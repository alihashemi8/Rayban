type MessengerBrand = "eitaa" | "rubika" | "bale" | "whatsapp";

/** Theme-colored marks keep each messenger recognizable without its colored badge. */
export default function MessengerMark({ brand }: { brand: MessengerBrand }) {
  const maskImage = `url(/brands/${brand}-mark.svg)`;
  return (
    <span
      className="messenger-mark"
      data-brand={brand}
      aria-hidden="true"
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    />
  );
}
