import React, {Component} from 'react'

export default class Controller extends Component{

    render(){
        return(
            <div>
                <button id='up' className="controller">
                    <span className='glyphicon glyphicon-chevron-up'></span>
                </button>
                <button id='left' className="controller">
                     <span className='glyphicon glyphicon-chevron-left'></span>
                </button>
                <button id='right' className="controller">
                     <span className='glyphicon glyphicon-chevron-right'></span>
                </button>
                <button id='down' className="controller">
                     <span className='glyphicon glyphicon-chevron-down'></span>
                </button>
                <button id="speed"> power </button>
            </div>
        )
    }

}


