import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEventPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  if (!slug) {
    return <p className="center">Loading...</p>;
  }
  const filter = {
    year: +slug[0],
    month: +slug[1],
  };
  const events = getFilteredEvents(filter);

  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <Fragment>
      <EventList items={events} />
    </Fragment>
  );
};

export default FilteredEventPage;
