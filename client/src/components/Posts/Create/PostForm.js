import React, { useState } from 'react';
import locationPin from '../../../assets/location-pin.svg'
import './form.css'
import { CreateMap } from '../../Maps/CreateMap'
import { TagsInput } from "react-tag-input-component";

export const PostForm = ({ onFormSubmit }) => {
  const [zoomValue, setZoomValue] = useState(6);
  const [mapCenter, setMapCenter] = useState([52.2129919, 5.2793703]); // Initial center position
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: undefined,
    longitude: undefined,
    tags: [],
    imagePath: undefined,
  });

  const handleMarkerPositionChange = (newPosition) => {
    setFormData({
      ...formData,
      latitude: newPosition.lat,
      longitude: newPosition.lng,
    });
  };

  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        [name]: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          // Update the center position when geolocation fetch is successful
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setZoomValue(15)
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };

  // Comma in between location
  let coordSeperator = '';
  if(formData.latitude && formData.longitude){
    coordSeperator = ','
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
     // Transform the array of tags into a comma-separated string
     const tagsToString = formData.tags.join(',');

     // Create a new object with the transformed tags string
     const formDataWithTagsString = {
       ...formData,
       tags: tagsToString,
     };

    onFormSubmit(formDataWithTagsString);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input required type="text" placeholder="Silver Necklace.." name="title" value={formData.title} onChange={handleChange} />
      </label>
      <br />

      <label name="description">
        Description:
        <textarea required name="description" placeholder="This necklace has two small.." value={formData.description} onChange={handleChange} />
      </label>
      <br />

      {/* Hidden input fields for latitude and longitude */}
      <input type="hidden" name="latitude" value={formData.latitude || ''} />
      <input type="hidden" name="longitude" value={formData.longitude || ''} />

      {/* Text field to display combined coordinates */}
      <div className="location-input-container">
        <label>
          Location:
          <div className="input-with-icon">
            <input style={{color: "gray", backgroundColor: "transparent"}} type="text" value={`${formData.latitude || ''}${coordSeperator} ${formData.longitude || ''}`} readOnly />
            <img onClick={handleGetLocation} className="locationIcon" src={locationPin} alt="Get Location" />
          </div>
        </label>
      <CreateMap key={mapCenter} center={mapCenter} title={formData.title} description={formData.description} zoom={zoomValue} onMarkerPositionChange={handleMarkerPositionChange}/>

      </div>

      <label>
        Tags:
        <TagsInput
          value={formData.tags}
          onChange={(tags) => setFormData({ ...formData, tags })}
          name="tags"
          placeHolder="Jewlery"
        />
      </label>
      <em>press enter/backspace to add or remove tags</em>

      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
      </label>
      <br />

      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '50%', marginTop: '10px' }} />
      )}

      <br />

      <button type="submit">Create Post</button>
    </form>
  );
};
