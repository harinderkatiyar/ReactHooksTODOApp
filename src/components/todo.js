import React, { useEffect, useState } from 'react';
import myTodo from '../images/to-do-list.png';

//To get the data from LS
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

export const Todo = () => {
    const [inputData, setinputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [showBtn, setshowBtn] = useState(false);
    const [toggleSubmit, settoggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null)
    //For Remove add data
    const addItem = () => {
        setItems(inputData);
        if (!inputData) {
            alert("Please Fill the data");
        } else if (inputData && !toggleSubmit) {
            setItems(items.map((ele) => {
                if (ele.id === isEditItem) {
                    return { ...ele, name: inputData }
                }
                return ele
            }))
            setinputData('');
            settoggleSubmit(true);
            setisEditItem(null);

        }

        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setinputData('');
            setshowBtn(true);
        }
    }
    //For Remove single data
    const deleteItem = (id) => {
        const updatedItems = items.filter((ele) => {
            return ele.id !== id
        })
        setItems(updatedItems)
    }
    //For Remove all Data
    const removeAll = () => {
        setItems([]);
        setshowBtn(false);
    }
    //For edit  Data
    const editItem = (id) => {
        let newEditItem = items.find((ele) => {
            return ele.id === id
        })
        setinputData(newEditItem.name);
        settoggleSubmit(false);
        setisEditItem(id);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])
    return (
        <div>
            <figure>
                <img src={myTodo} alt="todoLogo" width="100" />
                <figcaption> Add Your List Here 🍳 </figcaption>
            </figure>
            <div>
                <input className="text" value={inputData} onChange={(e) => setinputData(e.target.value)} placeholder="✍🏽 Add Items... " />
                {toggleSubmit ? <i className="fas fa-plus" onClick={addItem} title="Add Item"></i> : <i className="fas fa-save add-btn" onClick={addItem} title="Edit Items"></i>}
            </div>
            {
                items.map((ele) => {
                    return (
                        <div className="eachItem" key={ele.id}>
                            <h2>{ele.name}           <i className="fas fa-edit add-btn" onClick={() => editItem(ele.id)} title="Edit Item"></i> <i className="fas fa-trash-alt add-btn" onClick={() => deleteItem(ele.id)} title="Delete Items"></i></h2>
                        </div>)
                })
            }
            <br />
            {
                showBtn ?
                    <div className="show" >
                        <button className="button" onClick={removeAll} ><span> Remove All </span></button>
                    </div> : ""
            }
        </div>
    )
}
