import React, {Component} from 'react'

export default class Controller extends Component{

    render(){
        return(
            <div>
                <button id='up'>  
                    <span class='glyphicon glyphicon-chevron-up'></span>
                </button>
                <button id='down'>
                     <span class='glyphicon glyphicon-chevron-down'></span>
                </button>
                <button id='left'> 
                     <span class='glyphicon glyphicon-chevron-left'></span>
                </button>
                <button id='right'>
                     <span class='glyphicon glyphicon-chevron-right'></span>
                </button>
                <button> speed up</button>
            </div>
        )
    }

}


