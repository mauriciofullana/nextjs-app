import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventPage = ({ events }) => {
  const router = useRouter();
  const slug = router.query.slug;
  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <Fragment>
      <EventList items={events} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filter = {
    year: +params.slug[0],
    month: +params.slug[1],
  };
  const events = await getFilteredEvents(filter);

  return {
    props: { events },
  };
}

export default FilteredEventPage;
