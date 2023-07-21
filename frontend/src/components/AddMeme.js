import Button from "../UI/Button"
import {Form} from 'react-router-dom'
const AddMeme = () =>{
    return <>
        <Form method="post">
            <label>Mem</label>
            <input type="file" name="image" id="image"></input>
            <label>Tytuł</label>
            <input type="text" name="title" id="title">
            </input>
            <Button>Dodaj Mema</Button>
        </Form>
    </>
}

export default AddMeme;