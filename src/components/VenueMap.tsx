import Image from "next/image";

import { wedding } from "@/data/wedding";

export default function VenueMap() {
  return (
    <figure className="venue-map-card" aria-label={`${wedding.venue.name} 약도`}>
      <Image
        src="/images/maps/raum-location-map.jpg"
        alt={`${wedding.venue.name} 약도: ${wedding.venue.station} ${wedding.venue.exit}에서 ${wedding.venue.walk}`}
        width={1280}
        height={916}
        className="venue-map-image"
        sizes="(max-width: 520px) calc(100vw - 44px), 476px"
      />
    </figure>
  );
}
