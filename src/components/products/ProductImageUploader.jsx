"use client";

import { uploadImageToImgbb, validateImageFile } from "@/lib/uploadImage";
import { ImagePlus, LinkIcon, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProductImageUploader({ images = [], onChange, maxImages = 4 }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  const handleFileChange = async event => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    if (images.length + files.length > maxImages) {
      toast.error(`You can upload maximum ${maxImages} images.`);
      event.target.value = "";
      return;
    }

    try {
      files.forEach(validateImageFile);
      setUploading(true);
      const uploaded = [];

      for (const file of files) {
        const image = await uploadImageToImgbb(file);
        uploaded.push(image.url);
      }

      onChange([...images, ...uploaded]);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const addUrl = () => {
    const url = manualUrl.trim();
    if (!url) return toast.error("Please enter an image URL.");
    if (!url.startsWith("http")) return toast.error("Please enter a valid image URL.");
    if (images.length >= maxImages) return toast.error(`You can add maximum ${maxImages} images.`);

    onChange([...images, url]);
    setManualUrl("");
    toast.success("Image URL added.");
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[13px] font-semibold text-[#584940] dark:text-[#e2d7ce]">Product images</label>
        <span className="rounded-full border border-[#ded5cb] bg-[#fbf8f4] px-2.5 py-1 text-[11px] font-semibold text-[#807168] dark:border-[#3a2f28] dark:bg-[#17120f] dark:text-[#9a8980]">{images.length}/{maxImages}</span>
      </div>

      <div className="rounded-[22px] border border-dashed border-[#cdbfb3] bg-[#f6f0e9] p-4 dark:border-[#4a3b32] dark:bg-[#100c0a]">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[18px] border border-[#e2d7cc] bg-[#fbf8f4] px-4 py-9 text-center shadow-[0_10px_28px_rgba(47,34,26,0.04)] dark:border-[#30261f] dark:bg-[#17120f]">
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-orange-500/[0.08] blur-2xl" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
            <ImagePlus size={23} />
          </div>
          <h3 className="relative mt-4 text-base font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">Upload product images</h3>
          <p className="relative mt-1.5 max-w-md text-sm leading-6 text-[#807168] dark:text-white/42">
            JPG, PNG, or WEBP. Maximum 3MB per image and up to {maxImages} images.
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="btn-primary relative mt-4"
          >
            <UploadCloud size={17} />
            {uploading ? "Uploading..." : "Choose images"}
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative">
            <LinkIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8980]" size={17} />
            <input
              type="url"
              value={manualUrl}
              onChange={event => setManualUrl(event.target.value)}
              placeholder="Or paste an image URL"
              className="input-control pl-9"
            />
          </div>
          <button type="button" onClick={addUrl} disabled={uploading} className="btn-secondary">
            Add URL
          </button>
        </div>

        {images.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {images.map(url => (
              <div key={url} className="group relative overflow-hidden rounded-[16px] border border-[#ded5cb] bg-[#fbf8f4] shadow-sm dark:border-[#3a2f28] dark:bg-[#17120f]">
                <img src={url} alt="Product preview" className="aspect-[4/3] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onChange(images.filter(image => image !== url))}
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#fbf8f4]/95 text-red-600 shadow-sm backdrop-blur transition hover:bg-red-50 dark:bg-[#0f0c0a]/90"
                  title="Remove image"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
            At least one product image is required.
          </p>
        )}
      </div>
    </div>
  );
}
