import React, { useState } from 'react'

const CreateIngredient = () => {

    const [ingredient, setIngredient] = useState();

    

  return (
    <div className='add-ingredient-container'>
        <form className='form-add-ingredient'>
            <div className="form-header">
                <h2>Create New Ingredident</h2>
            </div>
            <div className="form-body">
                <div className="input-container">
                    <input 
                    type="text"
                    value={ingredient} 
                    onChange={(e) => setIngredient(e.target.value)} />
                </div>
            </div>
            <div className="form-footer">
                <button type="submit">
                    Submit
                </button>
                <button>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default CreateIngredient
