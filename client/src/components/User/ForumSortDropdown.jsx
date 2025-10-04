{
  /* STATUS: ok */
}

const ForumSortDropdown = () => {
  return (
    <>
      <div className="flex justify-end p-3">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1 bg-base-100">
            Sort
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a>Most Upvotes</a>
            </li>
            <li>
              <a>Least Upvotes</a>
            </li>
            <li>
              <a>Most Comments</a>
            </li>
            <li>
              <a>Least Comments</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ForumSortDropdown;
