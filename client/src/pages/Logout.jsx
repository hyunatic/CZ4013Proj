import React, { Component } from 'react'

export default class Logout extends Component {
    componentDidMount(){
        localStorage.clear()
        this.props.history.push('/')
    }

    /**
     * Logout page
     * @returns Logout page
     */
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
