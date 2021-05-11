import ReactDOM from 'react-dom';

//creates individual containers
export const createContainer = () => {
    const container = document.createElement('div');

    return {
        render: component => ReactDOM.render(component,container),
        container:container
    }
}