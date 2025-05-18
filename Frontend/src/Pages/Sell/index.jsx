import React from 'react'

const sell = () => {
  return (
    <div className="sell-container">
        <h1> Sell your Product </h1>
        <div className="sell-form">
            <form>
                <div className="form-group">
                    <label for="productName">Product Name</label>
                    <input type="text" name="productName" required/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default sell

