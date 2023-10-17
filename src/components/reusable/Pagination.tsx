import * as React from "react"
import clsx from "clsx";

interface Props {
  className?: string;
  total?: number;
  perPage?: number;
  current?: number;
  totalPage: number;
  handleChange: (num: number) => void;
}

const Pagination = ({ className, total , current, perPage, totalPage, handleChange }: Props) => {
  const [curPage, setCurPage] = React.useState(1)

  const handlePrev = () => {
    setCurPage((prev) => prev > 1 ? prev - 1 : 1)
  }

  const handleNext = () => {
    setCurPage((prev) => prev < totalPage ? prev + 1 : totalPage)
  }

  const handleClickNumber = (num: number) => {
    setCurPage(num)
  }

  React.useEffect(() => {
    handleChange(curPage)
  }, [curPage])

  const classItem = (num: number) => clsx("pagination-item", curPage === num && "active")

  return (
    <div tabIndex={0} className={`border rounded-sm pagination-container${" " + className ?? ""}`}>
      <div tabIndex={0} className="pagination-item" onClick={handlePrev}>Prev</div>
      {[...Array(totalPage)].map((_, i) => {
        const curNum = i + 1
        return (
          <div
            key={i}
            tabIndex={0}
            className={classItem(curNum)}
            onClick={() => handleClickNumber(curNum)}
          >
            {curNum}
          </div>
        )
      })}
      <div tabIndex={0} className="pagination-item" onClick={handleNext}>Next</div>
    </div>
  )
}

export default Pagination