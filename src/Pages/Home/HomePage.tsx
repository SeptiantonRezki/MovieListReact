import React, { useEffect } from 'react';
import { Form, Button, FloatingLabel, InputGroup, Table } from 'react-bootstrap';
import { Note, Siswa } from '../Modals';

const HomePage = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    useEffect(() => {
        let data: string | null = localStorage.getItem('data');
        if (data !== null) {
            let getDataLocal: [] = JSON.parse(data);
            dispatch({ type: 'setData', value: getDataLocal });
        }

    }, [])

    const componentTable = () => {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.data && state.data.map((element1: Note) => {
                                return (
                                    <tr >
                                        <td >{element1.id}</td>
                                        <td >{element1.title}</td>
                                        <td >{element1.description}</td>
                                        <td >
                                            <Button className='text-white' variant="info" onClick={() => dispatch({ type: 'editData', value: element1 })}>EDIT</Button>{' '}
                                            <Button className='text-white' variant="danger" onClick={() => dispatch({ type: 'removeData', value: element1.id })}>DELETE</Button>{' '}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }

    const buttonAdd = () => {
        if (state.idSelected === null) {
            return (
                <div>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'addData', value: { title: state.title, description: state.description } })
                        }}
                        className='mb-2'
                        as="input"
                        type="button"
                        value="Add"
                    />

                </div>
            )
        } else {
            return (
                <div className='mb-2'>
                    <span className='mr-2'>
                        <Button
                            onClick={() => {
                                dispatch({ type: 'editDataSelected', value: { title: state.title, description: state.description } })
                            }}
                            as="input"
                            type="button"
                            value="Update"
                            variant="success"
                        />
                    </span>
                    <span>
                        <Button
                            onClick={() => {
                                dispatch({ type: 'cancelUpdateData' })
                            }}
                            as="input"
                            type="button"
                            value="Cancel"
                            variant="danger"
                        />
                    </span>
                </div>
            )
        }

    }

    console.log(state);
    return (
        <>
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <div className='container'>
                    <div className='mb-2'>
                        <h1 className='text-center mb-2'>MOVIE LIST</h1>
                        <div className='mb-2'>
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control type="text" value={state.title} id="title" onChange={(e) => { dispatch({ type: 'title', value: e.target.value }) }} />
                        </div>
                        <>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Description"
                                    style={{ height: '100px' }}
                                    value={state.description}
                                    onChange={(e) => { dispatch({ type: 'description', value: e.target.value }) }}
                                />
                            </FloatingLabel>
                        </>
                    </div>
                    {componentTable()}
                    {buttonAdd()}
                </div>
            </div>


        </>
    )
}
interface InterfaceInitialState {
    idSelected: number | null,
    title: string;
    description: string;
    data: Note[];
}
const initialState: InterfaceInitialState = {
    idSelected: null,
    title: '',
    description: '',
    data: []
}

const reducer = (state: any, action: any) => {
    if (action.type === 'title') {
        return {
            ...state,
            title: action.value
        }
    } else if (action.type === 'description') {
        return {
            ...state,
            description: action.value
        }
    } else if (action.type === 'setData') {
        return {
            ...state,
            data: action.value
        }
    } else if (action.type === 'addData') {
        let newDataNote: Note = new Note(Date.now(), action.value.title, action.value.description)
        let dataNote: Note[] = [];
        if (state.data.length > 0) {
            state.data.forEach((element1: Note) => {
                dataNote.push(element1);
            })
        }
        dataNote.push(newDataNote);
        // state.data.push(newDataNote) => maka tanpa data state.data di ganti di bawah, akan langsung di update data statenya return {...state}
        localStorage.setItem('data', JSON.stringify(dataNote))
        console.log(dataNote);
        return {
            ...state,
            title: '',
            description: '',
            data: dataNote,
        }
    } else if (action.type === 'removeData') {
        let dataNote: Note[] = [];
        if (state.data.length > 0) {
            state.data.forEach((element1: Note) => {
                if (element1.id !== action.value) dataNote.push(element1);
            })
        }
        localStorage.setItem('data', JSON.stringify(dataNote))
        return {
            ...state,
            data: dataNote,
        }
    } else if (action.type === 'editData') {
        return {
            ...state,
            idSelected: action.value.id,
            title: action.value.title,
            description: action.value.description,
        }
    } else if (action.type === 'editDataSelected') {
        let dataNote: Note[] = [];
        if (state.data.length > 0) {
            state.data.forEach((element1: Note) => {
                if (element1.id === state.idSelected) {
                    dataNote.push(new Note(state.idSelected, action.value.title, action.value.description))
                } else {
                    dataNote.push(new Note(element1.id, element1.title, element1.description))
                }
            })
        }
        localStorage.setItem('data', JSON.stringify(dataNote))
        return {
            ...state,
            idSelected: null,
            title: '',
            description: '',
            data: dataNote,
        }
    } else if (action.type === 'cancelUpdateData') {
        return {
            ...state,
            idSelected: null,
            title: '',
            description: '',
        }
    } else {
        throw new Error();
    }





}

export default HomePage;