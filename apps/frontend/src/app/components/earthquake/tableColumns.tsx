import { ReactElement } from "react";

export interface ColumnDefinition<T> {
  field: string;
  headerName: string;
  width?: number;
  renderCell?: ({ row }: { row: T }) => ReactElement;
}

interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  date: string;
  longitude?: number | null;
  latitude?: number | null;
}

export const tableColumns = (
  handleOpen: (earthquake?: Earthquake) => void,
  handleDelete: (id: string) => void
): ColumnDefinition<Earthquake>[] => [
  { field: "location", headerName: "Location", width: 150 },
  { field: "magnitude", headerName: "Magnitude", width: 100 },
  { field: "date", headerName: "Date", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => handleOpen(row)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(row.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    ),
  },
];
