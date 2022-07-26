import { Alert } from "react-native";
const initialState = {
    todoList: [],
    editId: ''
}
const myReducer = (state = initialState, action) => {

    switch (action.type) {

        case "ADD_TODO":
            const { id, title, completed } = action.payload;
            if (title.length >= 3) {
                return {
                    ...state,
                    todoList: [
                        ...state.todoList,
                        {
                            id: id,
                            title: title,
                            completed: completed
                        }
                    ]
                };
            } else {
                Alert.alert('OOPS!', 'todo length should be at least 3');
            }

        case "DELETE_TODO":
            console.log(state)
            return {
                ...state,
                todoList: state.todoList.filter((item) => item.id !== action.id)

            };

        case "CHECKBOX":
            return {
                ...state,
                todoList: state.todoList.map(item => {
                    if (item.id === action.id) {
                        return { ...item, completed: true };
                    }
                    return item;
                })
            };

        case "EDIT":
            return {
                ...state,
                editId: action.id
            };

        case "SAVE_MODEL":
            return {
                ...state,
                todoList: state.todoList.map(item => {
                    if (item.id === state.editId) {
                        if (action.data.length >= 3) {
                            item.title = action.data
                            return item;
                        }
                        else {
                            Alert.alert('OOPS!', 'todo length should be at least 3');
                        }
                    }
                    return item;
                })
            };

        case "FETCH_DATA":
            return {
                ...state,
                todoList: action.data
            };

        default:
            return state;
    }
}
export default myReducer;
