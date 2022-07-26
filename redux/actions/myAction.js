export const addTodo = (todo) => {
    return {
        type: "ADD_TODO",
        payload: {
            //userId: 1,
            id: Math.random(),
            title: todo,
            completed: false
        }
    }
};
export const deleteTodo = (id) => {
    return {
        type: "DELETE_TODO",
        id
    }
};

export const checkboxHandler = (id) => {
    return {
        type: "CHECKBOX",
        id
    }
};
export const editHandler = (id) => {
    return {
        type: "EDIT",
        id
    }
};
export const saveModel = (data) => {
    return {
        type: "SAVE_MODEL",
        data
    }
};
export const getApiData = () => {
    return {
        type: "REQUEST_DATA"
    }
}




