import React, { useEffect, useState, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import filesApi from "../../api/filesApi";
import FileCard from "./components/FileCard";

const FilesPage = () => {
  const [attachments, setAttachments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchAttachments = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedAttachments = await filesApi.fetchAttachments(token);
      setAttachments(fetchedAttachments);
    } catch (error) {
      Swal.fire("خطأ", "فشل في جلب المرفقات. يرجى المحاولة مرة أخرى.", "error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAttachments();
  }, [fetchAttachments]);

  const getFileIconClass = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "fas fa-file-pdf";
      case "jpg":
      case "jpeg":
      case "png":
        return "fas fa-file-image";
      default:
        return "fas fa-file";
    }
  };

  const filteredAttachments = useMemo(() => {
    return attachments.filter((attachment) =>
      attachment.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [attachments, searchTerm]);

  const handleDelete = async (attachmentId) => {
    Swal.fire({
      title: "هل أنت متأكد من أنك تريد حذف هذا المرفق؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await filesApi.deleteAttachment(token, 0, 0, attachmentId); // Replace 0 with actual IDs
          Swal.fire("تم", "تم حذف المرفق بنجاح.", "success");
          setAttachments((prev) =>
            prev.filter(
              (attachment) => attachment.attachment_id !== attachmentId
            )
          );
        } catch {
          Swal.fire("خطأ", "حدث خطأ أثناء حذف المرفق.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">إدارة المرفقات</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ابحث عن ملف..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="text-center">جاري التحميل...</p>
      ) : filteredAttachments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttachments.map((attachment) => (
            <FileCard
              key={attachment.attachment_id}
              attachment={attachment}
              onViewDetails={() => console.log("View details", attachment)}
              onEdit={() => console.log("Edit", attachment)}
              onDelete={handleDelete}
              getFileIconClass={getFileIconClass}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">لا توجد مرفقات.</p>
      )}
    </div>
  );
};

export default FilesPage;
