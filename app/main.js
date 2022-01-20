import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const usingState = React.useState

const data = () => {
    let localData = localStorage.getItem('list')
    console.log(localData)
    if (localData) {
        return JSON.parse(localData)
    }
    else {
        return []
    }
}

function OurApp() {
    const [list, setList] = usingState(data)
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])
    return (
        <div>
            <Header />
            <AddForm setList={setList} />
            <ul className="container list">
                {list.map(l => <NewList setList={setList} name={l.name} id={l.id} key={l.id} />)}
            </ul>
            <Footer />
        </div>
    )
}

function AddForm(props) {

    const [name, setName] = usingState("")
    function handleSubmit(e) {
        e.preventDefault()
        props.setList(prev => prev.concat({ name, id: Date.now() }))
        setName("")
    }

    return (
        <form className="container form" onSubmit={handleSubmit}>
            <label className="label">Things to do</label><br></br>
            <input className="input" value={name} onChange={e => setName(e.target.value)} required></input>
            <button className="btn">Add</button>
        </form>
    )
}



function NewList(props) {

    function handleDelete() {
        props.setList(prev => prev.filter(list => list.id != props.id))
    }

    return (
        <li className="element"><i className="fas fa-angle-right"></i> {props.name}
            <button className="btn btn-del" onClick={handleDelete}>Delete</button>
        </li>
    )
}

function Footer() {
    return (
        <div>
            <p className="footer container">All rights reserved &copy;</p>
        </div>
    )
}

function Header() {
    return (
        <div>
            <h1 className="header container">To Do List</h1>
        </div>
    )
}

ReactDOM.render(<OurApp />, document.querySelector("#root"))