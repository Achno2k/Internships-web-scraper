import React from 'react';

const ErrorPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Oops! Something went wrong.</h1>
            <p style={styles.message}>We're sorry, but an unexpected error has occurred.</p>
            <button style={styles.button} onClick={() => window.location.reload()}>Reload Page</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8d7da',
        color: '#721c24',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#721c24',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ErrorPage;