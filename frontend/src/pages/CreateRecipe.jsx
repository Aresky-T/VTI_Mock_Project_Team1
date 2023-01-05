import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { upLoadFiles } from '../api/file.api'
import ModalLogin from '../components/auth/ModalLogin'

const CreateRecipe = () => {

  const currentUser = useSelector(state => state.auth.signIn.currentUser);
  const uploadRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState();

  // console.log('Current user: ',currentUser);

  const handleFocus = () => {
    console.log('focus input file');
    const image = document.getElementById('input-image');
    image.click();
  }

  const upLoadFilesForCreate = (formData, token) => {
    upLoadFiles(formData, token)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        // image.preview = URL.createObjectURL(image);
      })
      .catch((err) => {
        console.log('err: ', err);
      })
  }

  const handleChangeImage = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const file = formData.get("file");
    file.url = URL.createObjectURL(file);
    setImageFile({name: file.name, url: file.url})
    // upLoadFilesForCreate(file, currentUser.token);
  }

  useEffect(() => {
    const handler = (e) => {
      if (uploadRef.current && uploadRef.current.contains(e.target)) {
        document.addEventListener('focus', handleFocus())
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  if(!currentUser){
    console.log("no login")
    setTimeout(() => {
      setShowModal(true);
    }, 500)
  }

  return (
    <div className='create-recipe section'>
      <div className='create-container'>
        <div className='create-container-title'>
          <h2>🧑🏻‍🍳 Share your recipe 🍔</h2>
        </div>
        <div className='create-container-form'>
          <form encType='multipart/form-data'>
            <ul>
              <li className='form-line'>
                <label className='form-label'>Recipe Name: </label>
                <div className='form-input'>
                  <input type="text" placeholder='Enter recipe name' />
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label'>Dish Type: </label>
                <div className='form-input'>
                  <select className='form-dropdown'>
                    <option value=''>Please Select</option>
                    <option value='Main Dish'>Main Dish</option>
                    <option value='Side Dish'>Side Dish</option>
                    <option value='Appetizer'>Appetizer</option>
                    <option value='Soup'>Soup</option>
                    <option value='Soup'>Salad</option>
                    <option value='Dessert'>Dessert</option>
                  </select>
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label'>Description: </label>
                <div className='form-input'>
                  <textarea className='form-textarea' placeholder='Enter description'></textarea>
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label'>Ingredients:</label>
                <div className='form-input'>
                  <select className='form-select'>
                    <option>Please Select</option>
                    <option>Ingredient 1</option>
                    <option>Ingredient 2</option>
                    <option>Ingredient 3</option>
                  </select>
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label processing'>Steps:</label>
                <div className='form-input'>
                  <div className='step-container'>
                    <span>Step 1: </span>
                    <textarea placeholder='Enter step 1...'></textarea>
                  </div>
                  <button type="button" id='add-step-icon'>Add Step</button>
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label'>Note: </label>
                <div className='form-input'>
                  <textarea placeholder='Enter Note'></textarea>
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label'>Price: </label>
                <div className='form-input'>
                  <input type="number" placeholder='Ex: 100' />
                </div>
              </li>
              <li className='form-line'>
                <label className='form-label image' htmlFor='input-image'>Image: </label>
                <div className='form-input upload-image-container'>
                  <div className='upload-image'
                    title='Upload your image'
                    ref={uploadRef}
                  >
                    Browse Files
                    <div>Drag and drop files here</div>
                  </div>
                  <div className='input-image-container'>
                    <input type="file"
                      id='input-image'
                      name='file'
                      // multiple="multiple"
                      onChange={handleChangeImage}
                    />
                  </div>
                  <ul className='upload-list'>
                    {imageFile && (
                      <li className='image-container'>
                        <div className='image-container-item'>
                          <img src={imageFile.url} alt='' />
                        </div>
                        <span>{imageFile.name}</span>
                        <span
                          className='delete-icon'
                          onClick={() => setImageFile(null)}
                        >
                          <AiOutlineDelete />
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
            <div className='submit-button'>
              <button type='button' onClick={upLoadFilesForCreate}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      {showModal && <ModalLogin setShowModal={setShowModal}/>}
    </div>
  )
}

export default CreateRecipe