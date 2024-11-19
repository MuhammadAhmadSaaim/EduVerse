import React from 'react'
import Navbar from "../navbar"
import Footer from "../footer"

export const Layout = (props) => {
    return (
        <div className={props.class}>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    )
}