import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createCommentApi, getCommentsApi } from '../../api/comment.api';
import { IoMdArrowDropup } from 'react-icons/io';
import { userImage } from '../../constant/Image';
import ReviewType from './ReviewType';

const Reviews = ({ recipe, toast }) => {

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentUserList, setCurrentUserList] = useState([]);
  const [otherUserList, setOtherUserList] = useState([]);
  const currentUser = useSelector(state => state.auth.signIn.currentUser);
  let commentValid = comment.trim().length;

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  }

  const getComments = (recipe) => {
    getCommentsApi(recipe.id)
      .then(res => {
        const list = [...res.data];
        let list1 = new Set();
        let list2 = new Set();

        list.forEach(element => {
          if (currentUser?.id === element.user.id) {
            list1.add(element)
          } else {
            list2.add(element)
          }
        });

        setComments(list)
        setCurrentUserList([...list1])
        setOtherUserList([...list2])
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function handleSubmitComment(e) {
    e.preventDefault();

    const data = {
      userId: currentUser.id,
      recipeId: recipe.id,
      comment: comment
    };

    await createCommentApi(data, currentUser.token)
      .then(res => {
        if (res.data === "This comment already existed!") {
          toast.error('You have commented before!',
            {
              style: {
                fontSize: '13px',
                borderRadius: '15px',
                background: '#333',
                color: '#fff',
              },
            }
          );
        } else {
          toast('Comment successfully!',
            {
              icon: '✅',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
        }
      })
      .then(() => {
        getComments(recipe);
      })
      .catch(err => {
        toast.error('Comment Failed!');
      })

    setComment('');
  }

  useEffect(() => {
    recipe && getComments(recipe);
  }, [recipe])

  return (
    <div className='reviews'>
      <form className='form-reviews'>
        <p className="input-label">Leave a review</p>
        <textarea
          name="comment"
          id='comment-input'
          value={comment}
          placeholder='Let us know your thoughts...'
          onChange={handleChangeComment}
        />
        <button className="submit-comment"
          type="submit"
          style={commentValid > 0 ? styles.active : styles.block}
          onClick={(e) => handleSubmitComment(e)}
        >
          SUBMIT
        </button>
      </form>
      {currentUser &&
        <>
          <ReviewType list={currentUserList} label="Your" recipe={recipe}/>
          <ReviewType list={otherUserList} label="Other" />
        </>
      }
      {!currentUser && <ReviewType list={comments} label="" />}
    </div>
  )
}

const styles = {
  block: {
    pointerEvents: "none"
  },
  active: {
    pointerEvents: "auto",
    backgroundColor: "#333333",
    cursor: "pointer"
  }
};

export default Reviews