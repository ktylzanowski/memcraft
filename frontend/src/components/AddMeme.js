import Button from "../UI/Button";
import { Form } from "react-router-dom";
const AddMeme = () => {
  return (
    <>
      <Form method="post">
        <label>Mem</label>
        <input type="file" name="image" />
        <label>Tytuł</label>
        <input type="text" name="title" />
        <button type="submit">Dodaj mema</button>
      </Form>
    </>
  );
};

export default AddMeme;
