import React, {useState} from 'react';
import axios from 'axios';

import AddSvg from '../../assets/img/add.svg';


import closeSvg from "../../assets/img/close.svg";
import {Badge} from "../index";

const AddTask = ({list, onAddTask}) => {

    const [visibleForm, setFormVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks/', obj).then(({data}) => {
            onAddTask(list.id, data);
            toggleFormVisible()
        }).finally(() => {
            setIsLoading(false)
        }).catch(()=>{
            alert("Ошибка при добавлении задачи")
        })

    }

    return (
        <div className="tasks__form">
            {!visibleForm ? (<div className="tasks__form-new" onClick={toggleFormVisible}>
                    <img src={AddSvg} alt="Добавить"/>
                    <span>Новая задача</span>
                </div>) :
                (<div className="tasks__form-block">
                    <input type="text" className="field" onChange={e => setInputValue(e.target.value)}
                           value={inputValue}
                           placeholder="Текст задачи"/>
                    <button className="button" onClick={addTask} disabled={isLoading}>{isLoading ? 'Добавление':'Добавить задачу'}</button>
                    <button className="button button--grey" onClick={toggleFormVisible}>Отмена</button>
                </div>)}
        </div>

    );
};

export default AddTask;
