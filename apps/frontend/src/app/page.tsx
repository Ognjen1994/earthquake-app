import EarthquakeTable from "./components/earthquake/EarthquakeTable";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/components/earthquake/constants";
import { GET_EARTHQUAKES } from "@/graphql/queries";
import client from "@/lib/apolloClient";

export default async function Home() {
  const { data } = await client.query({
    query: GET_EARTHQUAKES,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: (DEFAULT_PAGE - 1) * DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: "no-cache",
  });

  console.log("koji rezovi");
  console.log(data);

  return (
    <div className="container mx-auto p-4">
      <EarthquakeTable
        initialData={data.earthquakes}
        totalCount={data.earthquakeCount}
        currentPage={DEFAULT_PAGE}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </div>
  );
}
