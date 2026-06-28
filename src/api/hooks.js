import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "./client";

/* -------------------------------- bookings ------------------------------- */

export const useAllBookings = (enabled = true) =>
  useQuery({
    queryKey: ["bookings", "all"],
    queryFn: async () => (await api.get("/bookings")).data.bookings,
    enabled,
  });

export const useMyBookings = (enabled = true) =>
  useQuery({
    queryKey: ["bookings", "mine"],
    queryFn: async () => (await api.get("/bookings/mine")).data.bookings,
    enabled,
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => (await api.post("/bookings", payload)).data.booking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) =>
      (await api.patch(`/bookings/${id}`, { status })).data.booking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

/* -------------------------------- notices -------------------------------- */

export const useActiveNotices = () =>
  useQuery({
    queryKey: ["notices", "active"],
    queryFn: async () => (await api.get("/notices/active")).data.notices,
  });

export const useAllNotices = (enabled = true) =>
  useQuery({
    queryKey: ["notices", "all"],
    queryFn: async () => (await api.get("/notices")).data.notices,
    enabled,
  });

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => (await api.post("/notices", payload)).data.notice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notices"] }),
  });
};

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }) =>
      (await api.patch(`/notices/${id}`, payload)).data.notice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notices"] }),
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => (await api.delete(`/notices/${id}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notices"] }),
  });
};

/* ----------------------------- service status ---------------------------- */

export const useServiceStatus = () =>
  useQuery({
    queryKey: ["serviceStatus"],
    queryFn: async () => (await api.get("/services/status")).data.status,
  });

export const useToggleServiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, active }) =>
      (await api.patch(`/services/status/${id}`, { active })).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["serviceStatus"] }),
  });
};
