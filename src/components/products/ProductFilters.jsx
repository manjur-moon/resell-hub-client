"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

const fallback = [
  "Electronics",
  "Mobile Phones",
  "Furniture",
  "Vehicles",
  "Fashion",
  "Home Appliances",
  "Books",
  "Sports",
  "Gaming",
  "Others",
];

const conditions = ["Used", "Like New", "Refurbished"];

const fieldClass =
  "h-11 w-full rounded-xl border border-[#d8cec4] bg-[#fbf8f4] px-3.5 text-sm text-[#211a16] outline-none transition placeholder:text-[#a59589] focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-[#463930] dark:bg-[#211a16] dark:text-white dark:placeholder:text-[#806f64] dark:focus:border-orange-500";

export default function ProductFilters({
  initialFilters = {},
  categories = [],
  onApply,
  onReset,
}) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    sort: "newest",
  });

  useEffect(() => {
    setFilters({
      search: initialFilters.search || "",
      category: initialFilters.category || "",
      condition: initialFilters.condition || "",
      minPrice: initialFilters.minPrice || "",
      maxPrice: initialFilters.maxPrice || "",
      location: initialFilters.location || "",
      sort: initialFilters.sort || "newest",
    });
  }, [initialFilters]);

  const change = (event) => {
    setFilters((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    onApply(filters);
  };

  const allCategories = categories.length ? categories : fallback;

  return (
    <form
      onSubmit={submit}
      className="overflow-hidden rounded-[26px] border border-[#d9cec3] bg-[#fbf8f4]/95 shadow-[0_24px_70px_rgba(36,24,17,0.14)] backdrop-blur-xl dark:border-[#3b2f27] dark:bg-[#17120f]/95 dark:shadow-[0_26px_80px_rgba(0,0,0,0.3)]"
    >
      <div className="flex flex-col gap-4 border-b border-[#e6ddd4] px-5 py-5 dark:border-[#342922] sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <div className="flex items-center gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#17120f] text-orange-400 shadow-sm dark:bg-orange-500/12">
            <SlidersHorizontal size={18} />
          </span>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-[#211a16] dark:text-white">
              Refine your search
            </h2>
            <p className="mt-0.5 text-xs leading-5 text-[#807168] dark:text-[#a8968b]">
              Category, condition, location, price and sorting in one place.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-fit items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-[#6f6259] transition hover:bg-orange-50 hover:text-orange-600 dark:text-[#c9bbb1] dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
        >
          <RotateCcw size={14} />
          Clear filters
        </button>
      </div>

      <div className="p-5 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="md:col-span-2 xl:col-span-2">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Search product
            </span>
            <span className="relative block">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8980]"
              />
              <input
                name="search"
                value={filters.search}
                onChange={change}
                placeholder="Search by product name..."
                className={`${fieldClass} pl-10`}
              />
            </span>
          </label>

          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Category
            </span>
            <select
              name="category"
              value={filters.category}
              onChange={change}
              className={fieldClass}
            >
              <option value="">All categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Condition
            </span>
            <select
              name="condition"
              value={filters.condition}
              onChange={change}
              className={fieldClass}
            >
              <option value="">All conditions</option>
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Location
            </span>
            <input
              name="location"
              value={filters.location}
              onChange={change}
              placeholder="e.g. Dhaka"
              className={fieldClass}
            />
          </label>

          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Minimum price
            </span>
            <input
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={change}
              placeholder="৳0"
              className={fieldClass}
            />
          </label>

          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Maximum price
            </span>
            <input
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={change}
              placeholder="Any price"
              className={fieldClass}
            />
          </label>

          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#79685d] dark:text-[#b7a69b]">
              Sort by
            </span>
            <select
              name="sort"
              value={filters.sort}
              onChange={change}
              className={fieldClass}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#e7ded6] pt-5 dark:border-[#342922] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[#8a796f] dark:text-[#9f8d82]">
            Tip: combine category and location filters for more focused results.
          </p>
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(249,115,22,0.24)] transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20 sm:w-auto sm:min-w-36"
          >
            <Search size={16} />
            Apply filters
          </button>
        </div>
      </div>
    </form>
  );
}
