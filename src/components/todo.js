import React,{useEffect} from 'react';
import myTodo from '../images/to-do-list.png';

//To get the data from LS
const getLocalItems=()=>{
    let list = localStorage.getItem('lists');
    console.log("my ls lsit ",list);
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}

export const Todo = () => {
    const [inputData, setinputData] = React.useState('');
    const [state, setstate] = React.useState(getLocalItems());
    const [showBtn, setshowBtn] = React.useState(false);
    //For Remove add data
    const addItem = () => {
        setstate(inputData);
        if (inputData) {
            setstate([...state, inputData]);
            setinputData('');
            setshowBtn(true);
        }
    }
    //For Remove single data
    const deleteItem = (id) => {
        const updatedItems = state.filter((ele, index) => {
            return index !== id
        })
        setstate(updatedItems)
    }
    //For Remove all Data
    const removeAll = () => {
        setstate([]);
        setshowBtn(false);
    }

    useEffect(()=>{
     localStorage.setItem('lists',JSON.stringify(state))
    },[state])
    return (
        <div>
            <figure>
                <img src={myTodo} alt="todoLogo" width="100" />
                <figcaption> Add Your List Here 🍳 </figcaption>
            </figure>
            <div>
                <input className="text" value={inputData} onChange={(e) => setinputData(e.target.value)} placeholder="✍🏽 Add Items... " />
                <i className="fas fa-plus" onClick={addItem} title="Add Item"></i>
            </div>
            {

                state.map((ele, index) => {
                    return (
                        <div className="eachItem" key={index}>
                            <h2>{ele} <i className="fas fa-trash-alt" onClick={() => deleteItem(index)} title="Delete Items"></i></h2>
                        </div>
                    )
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
