import React, {useState, useRef, useEffect} from "react";
import styles from "./styles.module.css"

function ReadOnlyItem({ item, handleEditClick, handleDeleteItem, handleCheckBox, checkedBox }) {
  const checkBoxRef = useRef()
  return (
    <tr className={styles.container}  >
      <td><input type='checkbox' onChange={(e)=> handleCheckBox(e)} value={item.id} ref={checkBoxRef}/></td>
      <td>
        <img src={item.picture} className={styles.profileImage} />
      </td>
      <td>{item.title}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>
        <button onClick={(e)=> handleEditClick(e, item)} className={styles.button}>Edit</button>
        <button onClick={(e)=>handleDeleteItem(e,item.id)} className={styles.button} >Delete</button>
      </td>
    </tr>
  );
}

export default ReadOnlyItem;
