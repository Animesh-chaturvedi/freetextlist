import "./App.css";
import React, { useState, useEffect, Fragment, useRef } from "react";
import EditableItem from "./components/EditableItem";
import ReadOnlyItem from "./components/ReadOnlyItem";
import SearchBar from "./components/SearchBar";

function App() {
  const listRef = useRef();

  const [resData, setResData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
    id: "",
    title: "",
    firstName: "",
    lastName: "",
    picture: "",
  });
  const [List, setList] = useState([]);
  const [checkedBox, setCheckedBox] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [end, setEnd] = useState(false);
  const [numUploaded, setNumUploaded] = useState(0);
  useEffect(() => {
    fetch(
      "https://storage.googleapis.com/thereviewindex-generalindex-views/tmp/users.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setResData(res.data);
        setList(res.data);
      });
  }, []);
  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      id: item.id,
      title: item.title,
      firstName: item.firstName,
      lastName: item.lastName,
      picture: item.picture,
    };

    setEditItemData(formValues);
  };
  const handleCancelEdit = (event, item) => {
    event.preventDefault();
    setEditItemId(null);
  };
  const handleDeleteItem = (event, del) => {
    event.preventDefault();
    const filterArray = List.filter((item) => {
      return item.id !== del;
    });
    setList(filterArray);
    const filterArray2 = resData.filter((item) => {
      return item.id !== del;
    });
    setResData(filterArray2);
  };

  const handleEditData = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newItemData = { ...editItemData };
    newItemData[fieldName] = fieldValue;
    setEditItemData(newItemData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      id: editItemData.id,
      title: editItemData.title,
      firstName: editItemData.firstName,
      lastName: editItemData.lastName,
      picture: editItemData.picture,
    };

    const newItems = [...List];
    const newItems2 = [...resData];

    const index = List.findIndex((item) => item.id === editItemData.id);
    const index2 = resData.findIndex((item) => item.id === editItemData.id);

    newItems[index] = editedItem;
    newItems2[index2] = editedItem;
    setResData(newItems2);
    setList(newItems);
    setEditItemId(null);
  };

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      let newList = checkedBox;
      checkedBox.push(value);
      setCheckedBox(newList);
    } else {
      let newList = checkedBox.filter((item) => {
        return item !== value;
      });
      setCheckedBox(newList);
    }
  };

  const DeleteSelected = (event) => {
    event.preventDefault();
    let newArray2 = resData;
    checkedBox.map((item) => {
      newArray2 = newArray2.filter((part) => {
        // console.log(part, item)
        return part.id !== item;
      });
    });
    let newArray = List;
    checkedBox.map((item) => {
      newArray = newArray.filter((part) => {
        // console.log(part, item)
        return part.id !== item;
      });
    });
    setList(newArray);
    setResData(newArray2);
    setCheckedBox([]);
    // console.log(checkedBox, newArray);
  };
  // console.log(listRef.current.scrollHeight, "hi")  ;
  const onScrollDiv = () => {
    console.log("ho");
    if (listRef.current) {
      console.log(listRef.current);
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      console.log(listRef.current);
      if (scrollTop + clientHeight >= scrollHeight) {
        if (!end) {
          getNext();
        }
      }
    }
  };
  const getNext = () => {
    setPageNo(pageNo + 1);
  };

  const filterList = async (term) => {
    if (term.length === 0) {
      setList(resData);
    } else {
      let filterArray = resData.filter((element) => {
        return (
          element.firstName.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
          element.lastName.toLowerCase().indexOf(term.toLowerCase()) !== -1
        );
      });
      await setList(filterArray);
      // console.log(filterArray);
    }
  };
  return (
    <div className="App">
      <div>
        <div style={{display:"flex", width:"95vw", justifyContent:"space-between"}} className="divhead">
          <SearchBar filterList={filterList} setPageNo={setPageNo} />
          <button onClick={DeleteSelected} className="deleteButton">
            Delete Selected
          </button>
        </div>
        <form onSubmit={handleEditFormSubmit}>
          <div
            onScroll={onScrollDiv}
            ref={listRef}
            // style={{ overflowY: "scroll", height: "95vh" }}
            className='tableDiv'
          >
            <table className='table' >
              <thead className="tableHead">
                <tr>
                  <th>Check Box</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {List.slice(0, 20 + 10 * pageNo).map((item) => {
                  return (
                    <Fragment key={item.id}>
                      {editItemId === item.id ? (
                        <EditableItem
                          // item={item}
                          editItemData={editItemData}
                          handleCancelEdit={handleCancelEdit}
                          handleEditFormChange={handleEditData}
                        />
                      ) : (
                        <ReadOnlyItem
                          item={item}
                          handleEditClick={handleEditClick}
                          handleDeleteItem={handleDeleteItem}
                          handleCheckBox={handleCheckBox}
                          checkedBox={checkedBox}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
