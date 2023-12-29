import React, { useState } from 'react'; // Import useState from React

export const PostForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: undefined,
    longitude: undefined,
    tags: '',
    imagePath: undefined,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is a file input, handle it separately
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass form data to the parent component for submission
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <br />

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />

      <label>
        Latitude:
        <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
      </label>
      <br />

      <label>
        Longitude:
        <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
      </label>
      <br />

      <label>
        Tags:
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
      </label>
      <br />

      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
      </label>
      <br />

      <button type="submit">Create Post</button>
    </form>
  );
};
