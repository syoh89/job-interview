import StarryActivityCalendar from "../components/StarryActivityCalendar";
import StarryActivityShowcase from "../components/StarryActivityShowcase";

export default async function HomePage() {
  return (
    <section className="flex flex-col gap-12">
      <StarryActivityShowcase />
      <StarryActivityCalendar />
    </section>
  );
}
