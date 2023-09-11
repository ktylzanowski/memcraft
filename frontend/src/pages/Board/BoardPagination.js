import classes from './BoardPagination.module.css';

const BoardPagination = (props) => {
    const { count, currentPage, onPageChange } = props;
    const totalPages = Math.ceil(count / 5);

    return (
        <div className={classes.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
                <span
                    key={index}
                    className={`${classes['page-number']} ${currentPage === index + 1 ? classes.active : ''}`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </span>
            ))}
        </div>
    );
};

export default BoardPagination;