import { useState } from "react";
import { Earthquake } from "@/__generated__/graphql";
import { formatDateForLocal } from "@/utils/dateUtils";
import { parseCoordinates } from "@/utils/locationUtils";

export const useEarthquakeForm = (
  initialValues: Partial<Earthquake> & {
    longitude: number | null;
    latitude: number | null;
  }
) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEarthquake, setCurrentEarthquake] = useState(initialValues);

  const handleOpen = (earthquake?: Earthquake) => {
    if (earthquake) {
      const localDate = formatDateForLocal(earthquake.date);
      const [longitude, latitude] = parseCoordinates(earthquake.location);

      setCurrentEarthquake({
        ...earthquake,
        longitude,
        latitude,
        date: localDate,
      });
      setEditMode(true);
    } else {
      setCurrentEarthquake({
        id: "",
        longitude: 0,
        latitude: 0,
        magnitude: 0,
        date: "",
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return { open, editMode, currentEarthquake, handleOpen, handleClose };
};
