import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import axios from 'axios';

const Sell = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    category: '',
    condition: 'new',
    stock: 1,
    imgUrl: '',
    description: {
      BrandName: '',
      DaysUsed: '',
      Condition: 'New',
      color: ''
    }
  })


  const categoryFields = {
    Electronics: [
      { label: 'Warranty', name: 'Warranty', type: 'select', options: ['Yes', 'No'] },
      { label: 'Material', name: 'material', type: 'text' },
      { label: 'Weight', name: 'weight', type: 'text' },
      { label: 'Dimensions', name: 'dimensions', type: 'text' },
      { label: 'Model', name: 'model', type: 'text' },
      { label: 'Power Usage', name: 'powerUsage', type: 'text' },
      { label: 'Battery Life', name: 'batteryLife', type: 'text' }
    ],
    "Mobile Phones": [
      { label: 'Warranty', name: 'Warranty', type: 'select', options: ['Yes', 'No'] },
      { label: 'Model', name: 'model', type: 'text' },
      { label: 'Storage', name: 'storage', type: 'text' },
      { label: 'RAM', name: 'RAM', type: 'text' },
      { label: 'Battery Health', name: 'batteryHealth', type: 'text' }
    ],
    Clothes: [
      { label: 'Material', name: 'material', type: 'text' },
      { label: 'Size', name: 'size', type: 'text' },
      { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Unisex'] }
    ],
    Footwear: [
      { label: 'Material', name: 'material', type: 'text' },
      { label: 'Size', name: 'size', type: 'text' },
      { label: 'Type', name: 'type', type: 'text' }
    ],
    Accessories: [
      { label: 'Material', name: 'material', type: 'text' },
      { label: 'Type', name: 'type', type: 'text' },
      { label: 'Dimensions', name: 'dimensions', type: 'text' }
    ],
    Books: [
      { label: 'Author', name: 'author', type: 'text' },
      { label: 'Genre', name: 'genre', type: 'text' },
      { label: 'Pages', name: 'pages', type: 'number' },
      { label: 'Publisher', name: 'publisher', type: 'text' }
    ],
    "Beauty Products": [
      { label: 'Expiry Date', name: 'expiryDate', type: 'text' },
      { label: 'Ingredients', name: 'ingredients', type: 'text' },
      { label: 'Skin Type', name: 'skinType', type: 'select', options: ['All', 'Oily', 'Dry', 'Combination', 'Sensitive'] }
    ],
    Sports: [
      { label: 'Type', name: 'type', type: 'text' },
      { label: 'Weight', name: 'weight', type: 'text' },
      { label: 'Dimensions', name: 'dimensions', type: 'text' },
      { label: 'Material', name: 'material', type: 'text' }
    ]
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        description: {
          ...prev.description,
          [name]: value
        }
      }))
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/product/create', formData);
      if (response.status == 200) {
        alert('Product created successfully!');
        setFormData({
          name: '',
          desc: '',
          price: '',
          category: '',
          condition: 'new',
          stock: 1,
          imgUrl: '',
          description: {
            BrandName: '',
            DaysUsed: '',
            Condition: 'New',
            color: ''
          }
        });
      }
    } catch (error) {
      alert('Error creating product: ' + error.message);
    }
  }



  const renderCategoryFields = () => {
    const fields = categoryFields[formData.category] || [];
    return fields.map(({ label, name, type, options }) => ( 
      <div key={name}>
        <label>{label}:</label>
        {type === 'select' ? (
          <select name={name} value={formData.description[name] || ''} onChange={handleChange} required>
            <option value="">Select</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData.description[name] || ''}
            onChange={handleChange}
            required
          />
        )}
      </div>
    ))
  }


  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
        <h1>Create New Product</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
          <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Short Description" required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required min="0" />
          <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} placeholder="Image URL" />

          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {Object.keys(categoryFields).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input type="text" name="BrandName" value={formData.description.BrandName} onChange={handleChange} placeholder="Brand Name" required />
          <input type="number" name="DaysUsed" value={formData.description.DaysUsed} onChange={handleChange} placeholder="Days Used" required />
          <select name="Condition" value={formData.description.Condition} onChange={handleChange} required>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <input type="text" name="color" value={formData.description.color} onChange={handleChange} placeholder="Color" required />

          {renderCategoryFields()}

          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  )
}

export default Sell
