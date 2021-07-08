import React from "react";

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 3 * (page - 1)
        ? ""
        : !load && (
            <div className="load-more">
              <button onClick={handleLoadMore}>Load more</button>
            </div>
          )}
    </>
  );
};

export default LoadMoreBtn;
