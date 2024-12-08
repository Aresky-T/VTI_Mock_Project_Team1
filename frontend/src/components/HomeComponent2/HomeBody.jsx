import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { getAllRecipesApi } from "../../api/recipe.api";
import PreviousSearch from "./PreviousSearch";
import RecipeCard from "./RecipeCard";
import ReactPaginate from "react-paginate";

const HomeBody = (props, ref) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleGetRecipesWithSearching = useCallback(() => {
    if (search !== prevSearch && page !== 1) {
      setPage(1);
      return;
    }
    getAllRecipesApi(search, page, itemsPerPage)
      .then((res) => {
        const dataWithPagination = res.data;
        setRecipes(dataWithPagination.content);
        setTotalPage(dataWithPagination.totalPages);
        setPrevSearch(search);
      })
      .catch((err) => {});
  }, [search, prevSearch, page]);

  const handleChangePage = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    handleGetRecipesWithSearching();
    //eslint-disable-next-line
  }, [handleGetRecipesWithSearching]);

  return (
    <div ref={ref} style={{ paddingTop: "60px" }}>
      <PreviousSearch search={search} setSearch={setSearch} />
      {recipes.length ? (
        <>
          <div className="recipes-container">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.code} recipe={recipe} />
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageRangeDisplayed={3}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeClassName="active"
            onPageChange={handleChangePage}
            pageCount={totalPage}
            forcePage={page - 1}
          />
        </>
      ) : (
        <div className="no-recipe">
          {search.trim() ? (
            <>There are no recipes named "{search}"</>
          ) : (
            "No recipes available"
          )}
        </div>
      )}
    </div>
  );
};

export default forwardRef(HomeBody);
