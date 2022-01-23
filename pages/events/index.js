import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";

const EventsPage = () => {
  const events = getAllEvents();

  return <EventList items={events} />;
};

export default EventsPage;
