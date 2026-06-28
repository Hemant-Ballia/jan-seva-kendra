import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Search,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { useLang } from "../../context/LangContext";
import { useAllBookings, useUpdateBookingStatus } from "../../api/hooks";

const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

const AdminBookings = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const { data: bookings = [], isLoading } = useAllBookings();
  const { mutateAsync: updateStatus } = useUpdateBookingStatus();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.name?.toLowerCase().includes(query) ||
        booking.phone?.toLowerCase().includes(query) ||
        booking.service?.toLowerCase().includes(query) ||
        booking.category?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === "Pending").length,
    completed: bookings.filter((booking) => booking.status === "Completed")
      .length,
    cancelled: bookings.filter((booking) => booking.status === "Cancelled")
      .length,
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateStatus({ id: bookingId, status: newStatus });
      toast.success(
        isHindi ? "Booking status update हो गया।" : "Booking status updated."
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (status === "Processing") {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    if (status === "Cancelled") {
      return "bg-rose-50 text-rose-700 border-rose-100";
    }

    return "bg-orange-50 text-orange-700 border-orange-100";
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-950">
          {isHindi ? "Bookings" : "Bookings"}
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {isHindi
            ? "User token bookings देखें और status update करें।"
            : "View user token bookings and update their status."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-800">
          <CalendarCheck className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "कुल बुकिंग" : "Total Bookings"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{stats.total}</h3>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-orange-800">
          <Clock className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "पेंडिंग" : "Pending"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{stats.pending}</h3>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2 className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "कम्प्लीट" : "Completed"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{stats.completed}</h3>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-rose-800">
          <XCircle className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "कैंसल" : "Cancelled"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{stats.cancelled}</h3>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                isHindi ? "नाम, मोबाइल या सेवा खोजें..." : "Search name, phone or service..."
              }
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
          >
            <option value="All">{isHindi ? "सभी Status" : "All Status"}</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              {isHindi ? "Bookings लोड हो रही हैं..." : "Loading bookings..."}
            </p>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-extrabold">
                    {isHindi ? "ग्राहक" : "Customer"}
                  </th>
                  <th className="px-4 py-3 font-extrabold">
                    {isHindi ? "सेवा" : "Service"}
                  </th>
                  <th className="px-4 py-3 font-extrabold">
                    {isHindi ? "तारीख" : "Date"}
                  </th>
                  <th className="px-4 py-3 font-extrabold">Status</th>
                  <th className="px-4 py-3 font-extrabold">
                    {isHindi ? "Action" : "Action"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <p className="font-extrabold text-slate-900">
                        {booking.name || "N/A"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        {booking.phone || "N/A"}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-800">
                        {booking.service || "N/A"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        {booking.category || "General"}
                      </p>
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-600">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={booking.status || "Pending"}
                        onChange={(event) =>
                          handleStatusChange(booking.id, event.target.value)
                        }
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-700"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              {isHindi
                ? "अभी कोई booking नहीं मिली।"
                : "No bookings found yet."}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {isHindi
                ? "जब यूजर website से token book करेंगे, records यहां दिखेंगे।"
                : "Records will appear here once users book tokens from the website."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
