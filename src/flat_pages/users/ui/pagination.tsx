import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Pagination = ({
  count,
  limit = 10,
}: {
  count: number;
  limit?: number;
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(count / limit) - 1;
  const activePage = searchParams?.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const leftPointer = activePage - 3 <= 1 ? 0 : activePage - 3;
  const rightPointer =
    activePage + 3 >= totalPages ? totalPages : activePage + 3;
  useEffect(() => {
    setPages(() =>
      Array.from({ length: totalPages })
        .map((_, id) => id + 1)
        .slice(leftPointer, rightPointer),
    );
  }, [activePage, totalPages, leftPointer, rightPointer]);
  return (
    <div className="flex items-center gap-x-5">
      <div className="flex gap-x-2 items-center">
        {pages.map((page) => {
          return <PaginateButton active={activePage} page={page} key={page} />;
        })}
      </div>
      <div className="text-white">
        {activePage} / {totalPages}
      </div>
    </div>
  );
};
const PaginateButton = ({ page, active }: { page: number; active: number }) => {
  return (
    <Link
      href={`/users?page=${page}`}
      className={`${
        active == page && "font-bold text-black"
      } w-10 h-10 flex items-center text-grey justify-center bg-white`}
    >
      {page}
    </Link>
  );
};
