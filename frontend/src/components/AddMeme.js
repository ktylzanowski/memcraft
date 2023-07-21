import Button from "../UI/Button";
import { Form } from "react-router-dom";
const AddMeme = () => {
  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <label>Mem</label>
        <input type="file" name="image" />
        <label>Tytuł</label>
        <input type="text" name="title" />
        <Button>Dodaj mema</Button>
      </Form>
    </>
  );
};

export default AddMeme;
