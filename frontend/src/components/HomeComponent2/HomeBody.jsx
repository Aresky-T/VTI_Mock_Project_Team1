import React, { forwardRef, useEffect, useState } from 'react'
import { getAllRecipesApi } from '../../api/recipe.api';
import PreviousSearch from './PreviousSearch'
import RecipeCard from './RecipeCard';
import ReactPaginate from 'react-paginate';

const HomeBody = (props, ref) => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [pageId, setPageId] = useState(1);
  const itemsPerPage = 9;

  function getAllRecipesForShow() {
    getAllRecipesApi(search, pageId, itemsPerPage)
      .then(res => {
        setRecipes(res.data.content);
        setTotalPage(res.data.totalPages)
      })
      .catch()
  };

  const handlePageClick = (event) => {
    setPageId(event.selected + 1);
  }

  useEffect(() => {
    setPageId(1);
    getAllRecipesForShow();
  }, [search])

  useEffect(() => {
    getAllRecipesForShow();
  }, [pageId])

  return (
    <div ref={ref} style={{ paddingTop: '60px' }}>
      <PreviousSearch search={search} setSearch={setSearch} />
      <div className="recipes-container">
        {/* <RecipeCard /> */}
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      {recipes.length === 0 && (
        <div className='no-recipe'>There are no recipes named "{search}"</div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        pageRangeDisplayed={3}
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeClassName='active'
        onPageChange={handlePageClick}
        pageCount={totalPage}
      />
      {/* <div className="show-more">
        <button className="btn-show-more">
          Show more
        </button>
      </div> */}
    </div>
  )
}

export default forwardRef(HomeBody);
