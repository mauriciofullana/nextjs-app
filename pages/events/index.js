import { Fragment } from "react";
import { useRoute, useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../dummy-data";

const EventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const handleFindEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList items={events} />;
    </Fragment>
  );
};

export default EventsPage;
