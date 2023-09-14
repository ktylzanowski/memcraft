import classes from "./StandartPagination.module.css";

const StandartPagination = ({ count, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(count / 5);

  return (
    <div className={classes.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`${classes["page-number"]} ${
            currentPage === index + 1 ? classes.active : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};

export default StandartPagination;
