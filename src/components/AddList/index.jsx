import React, {useState, useEffect} from "react";
import axios from "axios";

import {Badge, List} from "../../components";
import closeSvg from "../../assets/img/close.svg"

import "./AddList.scss"


const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(1)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Введите название папки')
            return;
        }
        setIsLoading(true)
        axios.post("http://localhost:3001/lists",
            {
                "name": inputValue,
                colorId: selectedColor
            }
        ).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name;
            const listObj = {...data, color: {name: color}}
            onAdd(listObj)
            onClose()
        }).finally(() => {
            setIsLoading(false)
        })
    }


    return (
        <div className="add-list">
            <List onCLick={() => setVisiblePopup(true)} items={[
                {
                    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>,
                    name: "Добавить папку",
                    className: "list__add-button"
                }

            ]}>
            </List>
            {visiblePopup && <div className={"add-list__popup"}>
                <img onClick={onClose} src={closeSvg} alt="Закрыть"
                     className="add-list__popup-close-btn"/>
                <input onChange={e => setInputValue(e.target.value)} value={inputValue} type="text" className="field"
                       placeholder="Название папки"/>
                <div className="add-list__popup-colors">
                    {
                        colors.map((color) => <Badge className={selectedColor === color.id && "active"}
                                                     onClick={() => setSelectedColor(color.id)} key={color.id}
                                                     color={color.name}></Badge>)
                    }
                </div>
                <button onClick={addList} className="button">{isLoading ? "Добавление..." : "Добавить"}</button>
            </div>}
        </div>

    )
}
export default AddList;
