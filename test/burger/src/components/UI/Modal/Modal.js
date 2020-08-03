import React from 'react';

import './Modal.scss';
import Hoc from '../../../hoc/Hoc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;  
    }
    render(){
        return (
            <Hoc>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                className="Modal"
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Hoc>
        );
    }
}

export default Modal;