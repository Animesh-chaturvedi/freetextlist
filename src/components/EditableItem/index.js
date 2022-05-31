import React from "react";
import styles from './styles.module.css'

function EditableItem({ editItemData, handleCancelEdit, handleEditFormChange }) {
    console.log(editItemData)
  return (
    <tr className={styles.container}>
      <td><input type='checkbox' /></td>
      <td>
        <img src={editItemData.picture} />
      </td>
      <td>
        <input type="text" className={styles.input} required placeholder="Enter Title" name="title" value={editItemData.title} onChange={(e)=> handleEditFormChange(e)} />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter First Name"
          name="firstName"
          value={editItemData.firstName}
          onChange={(e)=> handleEditFormChange(e)}
          className={styles.input}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter Last Name"
          name="lastName"
          value={editItemData.lastName}
          onChange={(e)=> handleEditFormChange(e)}
          className={styles.input}
        />
      </td>
      <td>
        <button className={styles.button} type="submit">Save</button>
        <button className={styles.button}  onClick={(e)=> handleCancelEdit(e, editItemData)} >Cancel</button>
      </td>
    </tr>
  );
}

export default EditableItem;
