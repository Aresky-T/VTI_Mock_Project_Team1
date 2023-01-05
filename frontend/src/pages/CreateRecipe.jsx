import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import imageUpload from '../imgs/Nem_rán.jpeg';

const CreateRecipe = () => {

  const currentUser = useSelector(state => state.auth.signIn.currentUser);
  const uploadRef = useRef();

  const [image, setImage] = useState();

  console.log(currentUser);

  const handleFocus = () => {
    console.log('focus input file');
    const image = document.getElementById('input-image');
    image.click();
  }

  const handleChangeImage = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const file = formData.get("file");
    file.preview = URL.createObjectURL(file);
    setImage({name: file.name, url: file.preview});
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

  console.log(image);

  return (
    <div className='create-recipe section'>
      <div className='create-container'>
        <div className='create-container-title'>
          <h2>🧑🏻‍🍳 Share your recipe 🍔</h2>
        </div>
        <div className='create-container-form'>
          <form>
            <ul>
              <li className='form-line'>
                <label className='form-label'>Recipe Name: </label>
                <div className='form-input'>
                  <input type="text" placeholder='Enter recipe name'/>
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
                  <input type="number" placeholder='Ex: 100'/>
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
                      multiple="multiple"
                      onChange={handleChangeImage}
                    />
                  </div>
                  <ul className='upload-list'>
                    {image && (
                      <li className='image-container'>
                        <div className='image-container-item'>
                          <img src={image.url} alt='' />
                        </div>
                        <span>{image.name}</span>
                        <span
                          className='delete-icon'
                          onClick={() => setImage(null)}
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
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe