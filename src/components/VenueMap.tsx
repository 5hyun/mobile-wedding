import { wedding } from "@/data/wedding";

export default function VenueMap() {
  return (
    <div className="venue-map-card venue-map-paper" aria-label={`${wedding.venue.name} 약도`}>
      <span className="venue-paper-road road-main" aria-hidden="true" />
      <span className="venue-paper-road road-left" aria-hidden="true" />
      <span className="venue-paper-road road-right" aria-hidden="true" />
      <span className="venue-paper-road road-bottom" aria-hidden="true" />
      <span className="venue-paper-road road-vertical" aria-hidden="true" />
      <span className="venue-paper-path" aria-hidden="true" />

      <span className="venue-paper-dot station-dot" aria-hidden="true" />
      <span className="venue-paper-label station-label">{wedding.venue.station}</span>

      <span className="venue-paper-label exit-label">
        <span>5</span>
        {wedding.venue.exit}
      </span>

      <span className="venue-paper-route">출구에서 {wedding.venue.walk}</span>

      <span className="venue-paper-dot venue-dot" aria-hidden="true" />
      <span className="venue-paper-label venue-label">
        <strong>{wedding.venue.name}</strong>
        <em>
          {wedding.venue.hall} · {wedding.venue.floor}
        </em>
      </span>
    </div>
  );
}
