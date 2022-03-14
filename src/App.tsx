import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";
import {GridReadyEvent} from "ag-grid-community/dist/lib/events";

const App = () => {

    const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]);
    const [gre, setGre] = useState<GridReadyEvent>();

    const [columnDefs] = useState<ColDef[]>([
        {
            field: "make",
            editable: true,
        },
        {field: "model"},
        {field: "price"},
    ]);

    function onGridReady(event: GridReadyEvent) {
        setGre(event);
    }

    function submit() {
        const newData: any[] = [];
        gre?.api?.forEachNode(({data}) => {
            console.log(data);
            newData.push(data);
        });
        // you can update the local state AND/OR call an API to permanently save
        // any changes
        setRowData(newData);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '4rem',
        }}>
            <pre>
                // Notice the local state does not update as you change the data in the grid
                {"\n"}
                // thus - do not rely on it in a Grid component, think of it as a scratch pad to be
                {"\n"}
                // used once only - instead from this point onwards rely entirely on the Grid API
                {"\n"}
                {JSON.stringify(rowData, null, "\t")}
            </pre>
            <br/>
            <div className="ag-theme-alpine"
                 style={{height: 400, width: 600}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </div>
            <br/>
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default App;
