import React, {Component} from 'react'

export default class Controller extends Component{

    render(){
        return(
            <div>
                <button id='up controller'>
                    <span class='glyphicon glyphicon-chevron-up'></span>
                </button>
                <button id='down controller'>
                     <span class='glyphicon glyphicon-chevron-down'></span>
                </button>
                <button id='left controller'>
                     <span class='glyphicon glyphicon-chevron-left'></span>
                </button>
                <button id='right controller'>
                     <span class='glyphicon glyphicon-chevron-right'></span>
                </button>
                <button> speed up</button>
            </div>
        )
    }

}


