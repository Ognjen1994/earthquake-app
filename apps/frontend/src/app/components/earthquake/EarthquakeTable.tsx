"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_EARTHQUAKES } from "@/graphql/queries";
import { useEarthquakeForm } from "@/hooks/useEarthQuakeForm";
import dynamic from "next/dynamic";
import { useEarthquakeMutation } from "@/hooks/useEarthquakeMutation";
import { tableColumns } from "./tableColumns";
import { formatDateTimeUS } from "@/utils/dateUtils";
import { Earthquake } from "@/__generated__/graphql";

const EarthquakeForm = dynamic(
  () => import("@/components/earthquake/EarthquakeForm"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[400px]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    ),
  }
);

interface EarthquakeTableProps {
  initialData: Earthquake[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export default function EarthquakeTable({
  initialData,
  totalCount,
  currentPage: initialPage,
  pageSize: initialPageSize,
}: EarthquakeTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const isInitialRender = useRef(true);

  useEffect(() => {
    const newPage = parseInt(
      searchParams.get("page") || initialPage.toString()
    );
    const newSize = parseInt(
      searchParams.get("size") || initialPageSize.toString()
    );
    setPage(newPage);
    setPageSize(newSize);
  }, [searchParams, initialPage, initialPageSize]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_EARTHQUAKES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    skip: isInitialRender.current, // To enhance LCP, first render should be handled by the server
  });

  const { handleSubmit, handleDelete } = useEarthquakeMutation(refetch);

  const { open, editMode, currentEarthquake, handleOpen, handleClose } =
    useEarthquakeForm({
      id: "",
      location: "",
      magnitude: 0,
      date: "",
      longitude: 0,
      latitude: 0,
    });

  const handlePaginationChange = useCallback(
    (newPage: number, newSize: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      params.set("size", newSize.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const columns = useMemo(
    () => tableColumns(handleOpen, handleDelete),
    [handleOpen, handleDelete]
  );

  const earthquakes = data?.earthquakes || initialData;
  const earthquakeCount = data?.earthquakeCount || totalCount;

  if (loading) return <p className="text-lg p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Earthquakes</h1>
        <button
          onClick={() => handleOpen()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onMouseEnter={() => import("@/components/earthquake/EarthquakeForm")}
        >
          Add Earthquake
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="p-3 text-left text-sm font-semibold"
                >
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {earthquakes.map((row: Earthquake) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.field} className="p-3 text-sm">
                    {column.field === "date"
                      ? formatDateTimeUS(row[column.field])
                      : column.renderCell
                      ? column.renderCell({ row })
                      : row[column.field as keyof Earthquake]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-4">
        <div className="flex gap-2">
          <button
            onClick={() => handlePaginationChange(page - 1, pageSize)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {Math.ceil(earthquakeCount / pageSize)}
          </span>
          <button
            onClick={() => handlePaginationChange(page + 1, pageSize)}
            disabled={(page + 1) * pageSize >= earthquakeCount}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Earthquake" : "Add Earthquake"}
            </h2>
            <EarthquakeForm
              initialValues={currentEarthquake}
              onSubmit={handleSubmit}
              handleClose={handleClose}
              editMode={editMode}
            />
          </div>
        </div>
      )}
    </>
  );
}
