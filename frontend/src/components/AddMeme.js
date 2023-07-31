import Button from "../UI/Button";
import { Form } from "react-router-dom";
import classes from "./AddMeme.module.css";
import { useState } from "react";
import Image from "../UI/Image"

const AddMeme = () => {
  const [isImage, setIsImage] = useState(false)
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      document.getElementById("image").src = imageUrl;
      setIsImage(true);
    }
  };
  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        className={classes.form}
      >
        {!isImage && <label htmlFor="image">Dodaj mema</label>}
        <Image imageUrl="" alt="Dodany mem" />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <label htmlFor="title">Tytuł</label>
        <input type="text" name="title" id="title" />
        <Button>Dodaj mema</Button>
      </Form>
    </>
  );
};

export default AddMeme;
