import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';
import Container from './../styled/Container';



function Book() {
    return (
        <React.Fragment>
            <Container width="100%" height="auto">
                <CustomerForm />
            </Container>

        </React.Fragment>
    );
}

export default Book;