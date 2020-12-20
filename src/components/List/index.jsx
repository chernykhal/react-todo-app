import React from "react"
import classNames from "classnames"
import axios from "axios"

import {Badge} from "../../components"
import "./List.scss"
import removeSvg from "../../assets/img/remove.svg"

const List = ({items, isRemovable, onCLick, onRemove}) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')){
            axios.delete("http://localhost:3001/lists/"+item.id).then(() => {
                onRemove(item.id)
            })
        }
    }

    return (
        <ul onClick={onCLick} className="list">
            {
                items.map((item, index) =>
                    <li key={index}
                        className={classNames(item.className, {"active": item.active})}>
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color.name}></Badge>}
                        </i>
                        <span>{item.name}</span>
                        {isRemovable && <img className={"list__remove-icon"} src={removeSvg} alt="Удалить папку" onClick={() => removeList(item)}/>}
                    </li>)
            }

        </ul>
    );
}
export default List;
