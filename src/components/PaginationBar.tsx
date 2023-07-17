import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  currentPage: number;
  totalPages: number; //20
}

const PaginationBar = ({ currentPage, totalPages }: Props) => {
  //10 = 20,10
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>,
    );
  }

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="join-item btn">
            <AiOutlineArrowLeft size={15} />
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={"?page=" + (currentPage + 1)} className="join-item btn">
            <AiOutlineArrowRight size={15} />
          </Link>
        )}
      </div>
    </>
  );
};

export default PaginationBar;
