import "./List.scss"
import classNames from "classnames"
import Badge from "../Badge"
import removeSvg from "../../assets/img/remove.svg"

const List = ({items, isRemovable, onCLick, onRemove}) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')){
            onRemove(item)
        }
    }

    return (
        <ul onClick={onCLick} className="list">
            {
                items.map((item, index) =>
                    <li key={index}
                        className={classNames(item.className, {"active": item.active})}>
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color}></Badge>}
                        </i>
                        <span>{item.name}</span>
                        {isRemovable && <img className={"list__remove-icon"} src={removeSvg} alt="Удалить папку" onClick={() => removeList(item)}/>}
                    </li>)
            }

        </ul>
    );
}
export default List;
