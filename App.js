import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, checkboxHandler, editHandler, saveModel, getApiData } from './redux/actions/myAction';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApiData())
  }, [])
  const mydata = useSelector(state => state.myReducer.todoList)
  const [input, setInput] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [newInput, setNewInput] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>My Todos</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder='enter what do you want to do !!!'
          onChangeText={setInput}
          value={input}
          style={styles.textinput}
        />
        <TouchableOpacity onPress={() => dispatch(addTodo(input), setInput(''))}>
          <Image
            style={{ width: 45, height: 45 }}
            source={require('./images/add-button.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          style={styles.flatlist}
          data={mydata}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <CheckBox
                value={item.completed}
                onChange={() => dispatch(checkboxHandler(item.id))}
              />
              <Text style={{
                ...styles.textList, textDecorationLine: item.completed ? 'line-through' : 'none',
                textDecorationStyle: 'solid'
              }}>{item.title}</Text>
              <TouchableOpacity onPress={() => dispatch(editHandler(item.id), setNewInput(item.title), setisModalVisible(true))}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require('./images/edit-button.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require('./images/delete-button.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Modal
        animationType='slide'
        visible={isModalVisible}
      >
        <View style={styles.model}>
          <Text style={styles.modeltext}>Enter text</Text>
          <TextInput
            placeholder='enter new text'
            onChangeText={(txt) => setNewInput(txt)}
            defaultValue={newInput}
            style={styles.modeltextinput}
          />
          <TouchableOpacity onPress={() => dispatch(saveModel(newInput), setisModalVisible(false))}>
            <Text style={styles.modelsave}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,
    backgroundColor: 'grey',
    borderRadius: 40,

  },
  headertext: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    paddingTop: 30,
  },
  input: {
    flex: 1.5,
    borderRadius: 40,
    backgroundColor: '#ADD8E6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textinput: {
    alignContent: 'center',
    fontSize: 16,
    width: '80%',
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',

  },
  content: {
    flex: 7,
    borderRadius: 40,
    backgroundColor: '#ADD8E6',
    borderTopWidth: 0.7,
    borderTopColor: 'grey'
  },
  flatlist: {
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    width: '100%',
  },
  textList: {

    padding: 7,
    borderWidth: 1,
    width: 250,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'grey',
    borderRadius: 15
  },
  model: {
    backgroundColor: '#ADD8E6',
  },
  modeltext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    paddingTop: 20
  },
  modeltextinput: {
    alignContent: 'center',
    fontSize: 16,
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 15
  },
  modelsave: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00FF00',
    borderWidth: 1,
    backgroundColor: '#778899',
  }
});
export default App;
//this is app.js file