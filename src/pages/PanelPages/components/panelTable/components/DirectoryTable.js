import React, {useState, useMemo, useEffect, useLayoutEffect, useRef} from "react";
import SearchBox from "./SearchBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {searchOrder} from "../../../../../api/getOrder.api";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const useSortableData = (orders, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);


    const sortedUsers = useMemo(() => {
        let sortableUsers = [...orders];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [orders, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({key, direction});
    };

    return {tableItems: sortedUsers, requestSort, sortConfig};
};

const DirectoryTable = (props) => {
    let {tableItems, requestSort, sortConfig} = useSortableData(props.tableItems);
    const [updateTableItems, setUpdateTableItems] = useState(tableItems)
    const {editOrder, deleteOrder} = props;
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        let updateFlag = true
        console.log('filter')
        var timeoutId = setTimeout(() => props.searchTableItems(searchValue).then((data) => {
                if (searchValue) {
                    updateFlag = true;
                    tableItems = (data.data)
                    setUpdateTableItems(tableItems)
                }
            }), 400
        )
        if (updateFlag){

            setUpdateTableItems(tableItems)

        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchValue, tableItems])


    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const searchHandler = (value) => {
        setSearchValue(value);
    };


    const onRadioChange = (event) => {
        const value = event.target.value
        setSearchValue(value)
    }

    function objectGet(obj, path) { return new Function('_', 'return _.' + path)(obj); };


    return (
        <>
            <div className="container">
                {
                    props.filter &&
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">فیلتر سفارشات</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="تحویل شده"
                            name="radio-buttons-group"
                            onChange={onRadioChange}
                        >
                            <FormControlLabel value="shipped" control={<Radio/>} label="تحویل شده"/>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <FormControlLabel value="pending" control={<Radio/>} label="در حال بررسی"/>
                            <FormControlLabel value="rejected" control={<Radio/>} label="رد شده"/>
                        </RadioGroup>
                    </FormControl>
                }
                <SearchBox searchHandler={searchHandler}/>
                <table>
                    <thead>
                    <tr>
                        {
                            props.tableHeader.map((headerItem) => {
                                return (
                                    <th key={headerItem.id}>
                                        <button
                                            type="button"
                                            onClick={() => requestSort(headerItem.name)}
                                            className={getClassNamesFor(headerItem.name)}
                                        >
                                            {headerItem.display}
                                        </button>
                                    </th>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {updateTableItems.length > 0 ? (
                        updateTableItems.map((tableItem) => (
                            <tr key={tableItem.id}>
                                {
                                    props.tableHeader.map((headerItem) =>  <td key={headerItem.id}>{tableItem[headerItem.name] || objectGet(tableItem, headerItem.name)}</td>)
                                }
                                <td>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => {
                                            editOrder(tableItem);
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteOrder(tableItem.id)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteOrder(tableItem.id)}
                                    >
                                        <AssessmentIcon/>
                                    </IconButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>داده ای وجود ندارد</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DirectoryTable;
