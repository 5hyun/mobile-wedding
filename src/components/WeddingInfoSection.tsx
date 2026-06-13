import { wedding } from "@/data/wedding";
import WeddingCountdown from "@/components/WeddingCountdown";

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
      <div className="paper-info-grid" aria-label="예식 일시">
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
          <p className="paper-date-line">2026년 9월 5일 (토) {wedding.date.time}</p>
        </div>
        <WeddingCountdown />
      </div>
    </section>
  );
}
