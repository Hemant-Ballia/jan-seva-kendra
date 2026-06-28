import { useState } from "react";
import { Bell, Edit, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

import { useLang } from "../../context/LangContext";
import {
  useAllNotices,
  useCreateNotice,
  useUpdateNotice,
  useDeleteNotice,
} from "../../api/hooks";

const AdminNotices = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const { data: notices = [] } = useAllNotices();
  const { mutateAsync: createNotice } = useCreateNotice();
  const { mutateAsync: updateNotice } = useUpdateNotice();
  const { mutateAsync: deleteNotice } = useDeleteNotice();

  const [editingNoticeId, setEditingNoticeId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    titleHi: "",
    type: "Service",
    status: "Active",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      titleHi: "",
      type: "Service",
      status: "Active",
    });

    setEditingNoticeId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.titleHi.trim()) {
      toast.error(
        isHindi
          ? "English और Hindi दोनों title भरें।"
          : "Please fill both English and Hindi titles."
      );
      return;
    }

    try {
      if (editingNoticeId) {
        await updateNotice({ id: editingNoticeId, ...formData });
        toast.success(isHindi ? "Notice update हो गया।" : "Notice updated.");
      } else {
        await createNotice(formData);
        toast.success(isHindi ? "Notice add हो गया।" : "Notice added.");
      }
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (notice) => {
    setEditingNoticeId(notice.id);

    setFormData({
      title: notice.title,
      titleHi: notice.titleHi,
      type: notice.type,
      status: notice.status,
    });
  };

  const handleDelete = (noticeId) => {
    const confirmDelete = window.confirm(
      isHindi
        ? "क्या आप यह notice delete करना चाहते हैं?"
        : "Do you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const updatedNotices = notices.filter((notice) => notice.id !== noticeId);

    setNotices(updatedNotices);
    saveNotices(updatedNotices);

    toast.success(isHindi ? "Notice delete हो गया।" : "Notice deleted.");
  };

  const handleStatusToggle = (noticeId) => {
    const updatedNotices = notices.map((notice) =>
      notice.id === noticeId
        ? {
            ...notice,
            status: notice.status === "Active" ? "Inactive" : "Active",
            updatedAt: new Date().toISOString(),
          }
        : notice
    );

    setNotices(updatedNotices);
    saveNotices(updatedNotices);

    toast.success(
      isHindi ? "Notice status update हो गया।" : "Notice status updated."
    );
  };

  const activeCount = notices.filter((notice) => notice.status === "Active").length;
  const inactiveCount = notices.length - activeCount;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-950">
          {isHindi ? "Notices" : "Notices"}
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {isHindi
            ? "Latest updates और ticker notices manage करें।"
            : "Manage latest updates and ticker notices."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-800">
          <Bell className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "कुल Notices" : "Total Notices"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{notices.length}</h3>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800">
          <Bell className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">Active</p>
          <h3 className="mt-1 text-3xl font-extrabold">{activeCount}</h3>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-rose-800">
          <Bell className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">Inactive</p>
          <h3 className="mt-1 text-3xl font-extrabold">{inactiveCount}</h3>
        </div>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          {editingNoticeId ? (
            <Edit className="h-5 w-5 text-orange-600" />
          ) : (
            <Plus className="h-5 w-5 text-blue-700" />
          )}

          <h3 className="text-lg font-extrabold text-slate-950">
            {editingNoticeId
              ? isHindi
                ? "Notice Edit करें"
                : "Edit Notice"
              : isHindi
                ? "New Notice Add करें"
                : "Add New Notice"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
              English Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notice in English"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
              Hindi Title
            </label>

            <input
              type="text"
              name="titleHi"
              value={formData.titleHi}
              onChange={handleChange}
              placeholder="हिंदी में notice लिखें"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
              Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            >
              <option value="Service">Service</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Job">Job</option>
              <option value="Exam">Exam</option>
              <option value="Important">Important</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-800 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-900"
            >
              <Save className="h-4 w-4" />
              <span>
                {editingNoticeId
                  ? isHindi
                    ? "Update Notice"
                    : "Update Notice"
                  : isHindi
                    ? "Save Notice"
                    : "Save Notice"}
              </span>
            </button>

            {editingNoticeId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-300"
              >
                <X className="h-4 w-4" />
                <span>{isHindi ? "Cancel" : "Cancel"}</span>
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-extrabold text-slate-950">
          {isHindi ? "Notice List" : "Notice List"}
        </h3>

        {notices.length > 0 ? (
          <div className="space-y-3">
            {notices.map((notice) => (
              <article
                key={notice.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                        {notice.type}
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                          notice.status === "Active"
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-rose-100 bg-rose-50 text-rose-700"
                        }`}
                      >
                        {notice.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900">
                      {isHindi ? notice.titleHi : notice.title}
                    </h4>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {isHindi ? notice.title : notice.titleHi}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusToggle(notice.id)}
                      className={`rounded-md px-3 py-2 text-xs font-bold text-white transition-colors ${
                        notice.status === "Active"
                          ? "bg-rose-600 hover:bg-rose-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {notice.status === "Active"
                        ? isHindi
                          ? "Inactive करें"
                          : "Mark Inactive"
                        : isHindi
                          ? "Active करें"
                          : "Mark Active"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEdit(notice)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-blue-900 transition-colors hover:bg-slate-100"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>{isHindi ? "Edit" : "Edit"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(notice.id)}
                      className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-rose-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{isHindi ? "Delete" : "Delete"}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              {isHindi ? "अभी कोई notice नहीं है।" : "No notices found yet."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminNotices;
