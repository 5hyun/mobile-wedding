import CopyButton from "@/components/CopyButton";
import { wedding } from "@/data/wedding";

const calendarDays = [
  "",
  "",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

export default function WeddingInfoSection() {
  return (
    <section className="info-section section-pad" id="wedding-info">
      <div className="paper-info-grid" aria-label="예식 일시와 장소">
        <div className="paper-calendar">
          <h2>SEPTEMBER</h2>
          <div className="calendar-weekdays" aria-hidden="true">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <span
                className={day === "5" ? "calendar-day is-wedding" : "calendar-day"}
                key={`${day || "blank"}-${index}`}
                aria-label={day === "5" ? "예식일 9월 5일" : undefined}
              >
                {day}
              </span>
            ))}
          </div>
          <p>{wedding.date.display} {wedding.date.time}</p>
        </div>

        <div className="paper-location-summary">
          <h2>LOCATION</h2>
          <div className="paper-map-thumb" aria-hidden="true">
            <span className="paper-road road-a" />
            <span className="paper-road road-b" />
            <span className="paper-road road-c" />
            <span className="paper-road road-d" />
            <span className="paper-map-dot station-dot" />
            <span className="paper-map-dot venue-dot" />
            <span className="paper-map-label station-label">{wedding.venue.station}</span>
            <span className="paper-map-label venue-label">{wedding.venue.name}</span>
            <span className="paper-map-label exit-label">{wedding.venue.exit}</span>
          </div>
          <p>
            {wedding.venue.name} / {wedding.venue.hall}
            <br />
            {wedding.venue.subwayLine} {wedding.venue.station} {wedding.venue.exit}
          </p>
        </div>
      </div>

      <div className="button-row">
        <CopyButton
          label="일정·장소 복사"
          value={`${wedding.date.display} ${wedding.date.time}, ${wedding.venue.name} ${wedding.venue.hall} ${wedding.venue.floorDetail}`}
        />
      </div>
    </section>
  );
}
