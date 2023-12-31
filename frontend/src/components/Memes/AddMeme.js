import { Form, useActionData } from "react-router-dom";
import { useState } from "react";

import Button from "../../UI/Button";
import Image from "../../UI/Image";
import classes from "./AddMeme.module.css";
import LoadingUI from "../../UI/LoadingUI";

const AddMeme = () => {
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const imageType = imageFile.type;
      const isImageType = imageType.startsWith("image/");

      if (isImageType) {
        const imageUrl = URL.createObjectURL(imageFile);
        setImageUrl(imageUrl);
        setIsImage(true);
      } else {
        alert("Wybrany plik nie jest akceptowalnym obrazem.");
      }
    }
  };

  const errors = useActionData();

  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        className={classes.form}
      >
        {!isImage && <label htmlFor="meme_image">Dodaj mema</label>}
        <Image imageUrl={imageUrl} alt="Dodany mem" />
        <input
          type="file"
          name="meme_image"
          id="meme_image"
          onChange={handleImageChange}
        />
        {errors?.meme_image && <span>{errors.meme_image}</span>}
        <label htmlFor="title">Tytuł</label>
        <input type="text" name="title" id="title" />
        {errors?.title && <span>{errors.title}</span>}
        <Button
          onClick={() => {
            setLoading(true);
          }}
        >
          {!loading ? "Dodaj mema": <LoadingUI />}
        </Button>
      </Form>
    </>
  );
};

export default AddMeme;
