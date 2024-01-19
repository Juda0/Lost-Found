import React, { useState } from 'react';
import locationPin from '../../../assets/location-pin.svg'
import { TagsInput } from "react-tag-input-component";
import styles from './form.module.css'
import { CreateMap } from '../../Maps/Create/CreateMap'
import BackIcon from '../../../assets/BackIcon.svg';
import { NavLink } from 'react-router-dom';

export const PostForm = ({ onFormSubmit, onErrorMessage  }) => {
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
    onErrorMessage(''); // Clear error
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

     // Regex to check for two floats separated by a comma
     const coordRegex = /^[-+]?\d*\.?\d+,\s*[-+]?\d*\.?\d+$/;

     // Check if the coordinates are in the correct format
     if (!coordRegex.test(`${formData.latitude || ''}${coordSeperator}${formData.longitude || ''}`)) {
       onErrorMessage('Please enter valid coordinates by dragging the marker or clicking the GPS button.');
       return; // Prevent form submission
     }
    
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
    <>
    <NavLink to="/posts" className="no-active-color">
            <img src={BackIcon} alt="Back" className="backIcon"/>
        </NavLink>
    <form onSubmit={handleSubmit} className={styles.form}>
      
      <label className={styles['first-label']}>
        Title:
        <input required type="text"  data-cy="postTitle" placeholder="Silver Necklace.." name="title" value={formData.title} onChange={handleChange} />
      </label>

      <label name="description">
        Description:
        <textarea required name="description"  data-cy="postDescription" placeholder="This necklace has two small.." value={formData.description} onChange={handleChange} />
      </label>

      {/* Hidden input fields for latitude and longitude */}
      <input type="hidden" name="latitude" value={formData.latitude || ''} />
      <input type="hidden" name="longitude" value={formData.longitude || ''} />

      {/* Text field to display combined coordinates */}
      <div className={styles["location-input-container"]}>
        <label className={styles['input-with-icon-label']}>
          Location:
          <div className={styles["input-with-icon"]}>
            <input required placeholder='Drag the marker icon or click the GPS button to set location' style={{color: "gray", backgroundColor: "transparent"}} type="text" value={`${formData.latitude || ''}${coordSeperator} ${formData.longitude || ''}`} readOnly />
            <img onClick={handleGetLocation}  data-cy="fetchLocationButton" className={styles["locationIcon"]} src={locationPin} alt="Get Location" />
          </div>
        </label>
      <CreateMap key={mapCenter} center={mapCenter}  data-cy="map" title={formData.title} description={formData.description} zoom={zoomValue} onMarkerPositionChange={handleMarkerPositionChange}/>

      </div>

      <label>
        Tags:
        <TagsInput
         data-cy="tagsInput"
          value={formData.tags}
          onChange={(tags) => setFormData({ ...formData, tags })}
          name="tags"
          placeHolder="Jewelery"
        />
      </label>
      <em>press enter/backspace to add or remove tags</em>

      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
      </label>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className={styles['preview-image']}/>
      )}

      <button type="submit"  data-cy="createPost">Create Post</button>
    </form>
    </>
  );
};
