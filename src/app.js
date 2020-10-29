import React from 'react'
import ReactDOM from 'react-dom'

import Login from './components/Login'
import Dashboard from './components/Dashboard'

const elements = document.getElementsByClassName('App')

const components = {
    Login: <Login />,
    Dashboard: <Dashboard />
}

for (let i = 0; i <= elements.length; i++) {
    if (elements[i]) {
        const currentComponent = Object.keys(components)
            .find(component => component === elements[i].id) || null

        ReactDOM.render((components[currentComponent]),
            document.getElementById(currentComponent))
    }
}
