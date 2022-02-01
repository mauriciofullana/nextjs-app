import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/EventList";

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
  };
}

export default HomePage;
