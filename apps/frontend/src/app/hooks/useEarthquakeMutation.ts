import { useMutation } from "@apollo/client";
import {
  ADD_EARTHQUAKE,
  UPDATE_EARTHQUAKE,
  DELETE_EARTHQUAKE,
} from "@/graphql/queries";
import { IEarthquakeWithCoordinates } from "@/types/earthquake";

export const useEarthquakeMutation = (refetch: () => void) => {
  const [addEarthquake] = useMutation(ADD_EARTHQUAKE);
  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE);
  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE);

  const handleSubmit = async (
    values: IEarthquakeWithCoordinates,
    editMode: boolean
  ) => {
    const { id, longitude, latitude, magnitude, date } = values;
    const formattedLocation = `${longitude}, ${latitude}`;

    try {
      if (editMode && id) {
        await updateEarthquake({
          variables: { id, location: formattedLocation, magnitude, date },
        });
      } else {
        await addEarthquake({
          variables: { location: formattedLocation, magnitude, date },
        });
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEarthquake({ variables: { id } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return { handleSubmit, handleDelete };
};
