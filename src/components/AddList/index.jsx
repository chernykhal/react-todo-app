import List from "../List";
import React, {useState} from "react";
import Badge from "../Badge";

import closeSvg from "../../assets/img/close.svg"

import "./AddList.scss"


const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')

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
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({
            "id": Math.random(),
            "name": inputValue,
            color
        },)
        onClose()
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
                <button onClick={addList} className="button">Добавить</button>
            </div>}
        </div>

    )
}
export default AddList;
