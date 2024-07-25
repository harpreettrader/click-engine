import React, { useState, useContext } from 'react';
import { GameContext } from '../GameContext/GameContext';

const Gamenft = () => {
  const {
    nftCurrency,
    isLoadingNFT,
    handleImageUpload,
    handleFileUpload,
    handleSubmit,
    createGameNft,
    generateAccessId,
  } = useContext(GameContext);

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  const [formInput, setFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const handleInputChange = (key, value) => {
    setFormInput(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  // const handleNameChange = e => {
  //   setName(e.target.value);
  // };

  // const handleDescriptionChange = e => {
  //   setDescription(e.target.value);
  // };

  // const handlePriceChange = price => {
  //   // setPrice(prevState => ({ ...prevState, p }));
  //   setPrice(price);
  // };

  // const handlePriceChange = (key, value) => {
  //   setPrice(prevState => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (
        !formInput.name ||
        !formInput.description ||
        !formInput.price ||
        !file ||
        !image
      ) {
        throw new Error('Please fill in all fields and upload files.');
      }
      const finalURL = await handleSubmit(formInput);
      const accessId = generateAccessId();
      createGameNft(accessId, finalURL, formInput.price);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Upload Files</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={() => handleFileUpload(file)}>
          Upload File
        </button>
        <br />
        <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={() => handleImageUpload(image)}>
          Upload Image
        </button>
        <br />
        <input
          type="text"
          placeholder="Name"
          // value={name}
          onChange={e => handleInputChange('name', e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          // value={description}
          onChange={e => handleInputChange('description', e.target.value)}
        />
        <br />
        <input
          type="number"
          step="0.0001"
          placeholder="Price (ETH)"
          // value={price}
          onChange={e => handleInputChange('price', e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Gamenft;
