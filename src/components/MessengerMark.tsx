type MessengerBrand = "eitaa" | "rubika" | "bale";

/** Theme-colored marks keep each messenger recognizable without its colored badge. */
export default function MessengerMark({ brand }: { brand: MessengerBrand }) {
  if (brand === "eitaa")
    return (
      <span
        className="messenger-mark"
        data-brand={brand}
        aria-hidden="true"
        style={{
          maskImage: "url(/brands/eitaa-mark.svg)",
          WebkitMaskImage: "url(/brands/eitaa-mark.svg)",
        }}
      />
    );
  if (brand === "bale")
    return (
      <span
        className="messenger-mark"
        data-brand={brand}
        aria-hidden="true"
        style={{
          maskImage: "url(/brands/bale-mark.svg)",
          WebkitMaskImage: "url(/brands/bale-mark.svg)",
        }}
      />
    );
  return (
    <svg
      className="messenger-mark"
      data-brand={brand}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m16 2 6 3.5v7L16 16l-6-3.5v-7Z" />
      <path d="m10 5.5 6 3.5 6-3.5M16 9v7" />
      <path d="m9 14 6 3.5v7L9 28l-6-3.5v-7Z" />
      <path d="m3 17.5 6 3.5 6-3.5M9 21v7" />
      <path d="m23 14 6 3.5v7L23 28l-6-3.5v-7Z" />
      <path d="m17 17.5 6 3.5 6-3.5M23 21v7" />
    </svg>
  );
}
