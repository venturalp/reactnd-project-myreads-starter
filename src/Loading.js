import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
    componentWillMount = () => {
        document.body.classList.add('no-scroll');
    }

    componentWillUnmount = () => {
        document.body.classList.remove('no-scroll');
    }

    static propTypes = {
        marginTop: PropTypes.number
    }

    render(){

        const loadingStyle = {
            top:  this.props.marginTop + 'px' || '0px'
        }

        return (
            <div className="bg-loading" style={loadingStyle}>
                <div className="lds-hourglass"></div>
            </div>
        )
    }
}

export default Loading