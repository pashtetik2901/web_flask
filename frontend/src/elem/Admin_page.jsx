import {useState, useEffect} from 'react'
import './style/AdminPage.css'
import Header from './Header';
import Slider from './Slider';

function Admin(){
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    const [data_link, setDataLink] = useState([]);


    const Send_data_to_serv = async(e) => {
        e.preventDefault()
        try{
            const form_data = new FormData();
            form_data.append('title', title);
            form_data.append('text', text);
            form_data.append('json_link', JSON.stringify(data_link))

            const response = await fetch(
                "http://localhost:5001/send_from_api",{
                    method: "POST",
                    body: form_data
                }
            )
            
            const data = await response.json()
            console.log(data.res)

            setTitle('');
            setText('');
            setLink('');
            setDataLink([]);
        }
        catch(e){
            console.log("Error: ", e);
        }
    }

    const deleteItem = async (id) => {
        try{
            const form_data = new FormData()
            form_data.append('del', id)
            const response = await fetch(
                "http://localhost:5001/delete_item", {
                    method: "POST",
                    body: form_data
                }
            )
            const data = await response.json()
            console.log(data.res)

            setList(list.filter(item => item[0] !== id))
        }
        catch(err){
            console.log(err)
        }
    }

    const plusLink = (e) => {
        e.preventDefault();
        setDataLink(prev => [...prev, {"link":link}])
        setLink('')

    }

    const delete_link = (index) => {
        setDataLink(data_link.filter((_, i) => i !== index))
    }


    useEffect(() => {
        fetch("http://localhost:5001/api")
        .then(response => response.json())
        .then(list => setList(list))
        .catch((e) => {console.log("Error - не могу считать", e)})
    }, [])


    return(
      <>
        <Header/>

        <form onSubmit={Send_data_to_serv} className='form_admin'>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title}/>
            <input type='text' placeholder='Text' onChange={(e) => setText(e.target.value)} value={text}/>
           <div>
                <input type='text' placeholder='Link' className='inp_link' onChange={(e) => setLink(e.target.value)} value={link}/>          
                <button onClick={plusLink} className='but_plus_link'>plus</button>
            </div>
            <button type='submit' className='but_send_to_serv'>Send</button>
        </form>

        <div className='list_link'>
        {
            data_link.length != 0 ? (
                data_link.map((elem, index) => (
                    <div className='one_link'>
                        <li>{elem.link}</li><button onClick={() => delete_link(index)}>Del link {index}</button>
                    </div>
                ))
            ) : (
                <div></div>
            )
        }
        </div>

        <div className='list_main'>
            {
                list.map(item => (
                    <div className='list_item'>
                        <text>
                            <h3>{item[1]}</h3>
                            <p>{item[2]}</p>
                            <button onClick={() => {deleteItem(item[0])}}>Delete</button>
                        </text>
                        <Slider data = {item[3]}/>
                    </div>
                ))
            }
        </div>
      </>
    );
}

export default Admin;