import Pagination from 'rc-pagination';
import { MdFastRewind, MdFastForward } from 'react-icons/md';
import PropTypes from 'prop-types';

export const PaginationBlock = ({
  items,
  size,
  current,
  setSize,
  setCurrent,
}) => {
  // table pagination and filter
  const PerPageChange = value => {
    setSize(value);
    const newPerPage = Math.ceil(items.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <button>
          <MdFastRewind />
        </button>
      );
    }
    if (type === 'next') {
      return (
        <button>
          <MdFastForward />
        </button>
      );
    }
    return originalElement;
  };
  return (
    <div className="table-filter-info">
      <Pagination
        className="pagination-data"
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        onChange={PaginationChange}
        total={items.length}
        current={current}
        pageSize={size}
        showSizeChanger={false}
        itemRender={PrevNextArrow}
        onShowSizeChange={PerPageChange}
        style={{}}
      />
    </div>
  );
};

PaginationBlock.propTypes = {
  items: PropTypes.any,
  size: PropTypes.number,
  current: PropTypes.number,
  setSize: PropTypes.func,
  setCurrent: PropTypes.func,
};
