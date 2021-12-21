import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function OurApp() {

    const [info, setInfo] = useState([])

    // only run once the first time
    useEffect(() => {
        if (localStorage.getItem("eventdata")) {
            setInfo(JSON.parse(localStorage.getItem("eventdata")))
        }
    }, [])

    // Every time loading
    useEffect(() => {
        localStorage.setItem("eventdata", JSON.stringify(info))
    }, [info])

    return (
        <div>
            <Header />
            <Form setInfo={setInfo} />
            <ul>
                {info.map(i => <AddForm setInfo={setInfo} id={i.id} event={i.event} date={i.date} key={i.id} />)}
            </ul>
            <Footer />
        </div>
    )
}

function Header() {
    return (
        <div>
            <h1 className='header'>To Do List</h1>
        </div>
    )
}

function Form(props) {



    const [event, setEvent] = useState()
    const [date, setDate] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        props.setInfo(prev => prev.concat({ event, date, id: Date.now() }))
        console.log(event)
        setEvent("")
        setDate("")

    }

    return (
        <form onSubmit={handleSubmit} className='subform form'>
            <li>
                <label>Event Name</label><br></br>
                <input value={event} onChange={e => setEvent(e.target.value)} type='text' name='text' placeholder='Event' />
            </li>
            <li>
                <label>Date</label><br></br>
                <input value={date} onChange={e => setDate(e.target.value)} type='date' name='date' />
            </li>
            <button className='btn'>Submit</button>
        </form>
    )
}

function AddForm(props) {

    function handleDelete() {
        props.setInfo(prev => prev.filter(info => info.id != props.id))
    }

    return (
        <div className='displayform'>
            <ul className='addform'>
                <li className='list'><h3>{props.event} event remainder | Date: {props.date}</h3>

                </li>
                <li>
                    <button className='del-btn' onClick={handleDelete}>Delete</button>
                </li>
            </ul>


        </div>
    )
}

function Footer() {
    return (
        <div>
            <h3 className='footer'><span>&reg;</span> All Rights Reserved</h3>
        </div>
    )
}

ReactDOM.render(<OurApp />, document.querySelector("#app"))