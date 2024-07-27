import React, { Fragment, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import { v4 as uuidv4 } from 'uuid';
import ExcelFetcherComponent from '../excel/excel';
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Task } from '@calendar/components';
import { useStore } from '@calendar/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc,getDocs,setDoc,collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

 import {auth,db} from '../../firebase.js';


const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19
  },
  taskContainer: {
    height: 570,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22
  },
  signInButton: {
    backgroundColor: '#2E66E7',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    width: 90,
  }
});

const datesWhitelist = [
  {
    start: moment(),
    end: moment().add(365, 'days') // total 4 days enabled
  }
];

export default function Home({ navigation,Routes }) {
  const { updateSelectedTask, deleteSelectedTask, todo } = useStore(
    (state) => ({
      updateSelectedTask: state.updateSelectedTask,
      deleteSelectedTask: state.deleteSelectedTask,
      todo: state.todo
    })
  );
  
   const { updateTodo} = useStore((state) => ({
    updateTodo: state.updateTodo
  }));
  
 
//   const getData = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'todos'));
//       //.log('querySnapshot', querySnapshot);
  
//       // Iterate through each document in the query result
//       querySnapshot.forEach((doc) => {  
//         const data = doc.data();
//         const { title, time,userEmail } = data;
//        // console.log('Document data:', data);
//         // Destructure time from the alarm object
//         //const { time } = alarm;
//         const date = time.split("T")[0]; 

//         if (userEmail1 === userEmail) { 
//           handleCreateEventData(title, date);
//           console.log('Create event handled for document:', doc.id);
//        }
//       });
  
//     } catch (error) {
//         console.error("Error fetching document:", error);
//     }
// };



const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'todos'));
  
      // Iterate through each document in the query result
      querySnapshot.forEach((doc) => {  
        const data = doc.data();
        const { title, time, userEmail } = data;
        const date = time.split("T")[0]; 
        
        // Check if the key is already encountered
        if (  userEmail1 === userEmail) { 
          //async () => AsyncStorage.clear();
          handleCreateEventData(doc.id,title, date);
          console.log('Create event handled for document:', doc.id);
        }
      });
  
    } catch (error) {
        console.error("Error fetching document:", error);
    }
};

const createTodo1 = async (selectedTask,userEmail) => {
  try {
    const { title, alarm } = selectedTask;
    const { time } = alarm;
    
      const docRef = doc(db, 'todos', selectedTask.key); 
      
      await setDoc(docRef, { title,time, userEmail }); 

      console.log("Document written with ID: ", docRef.id);
  } catch (error) {
      console.error("Error adding document: ", error);
  }
};



const handlePress = () => {
    //console.log("working");
    getData();
};

  const handleCreateEventData = async (keytemp,name, date1) => {
    
    const taskText = name;
    const notesText = ''; // You can set notes based on your requirements
    const alarmTime = ''; // Set the alarm time if needed
    const isAlarmSet = false; // Set whether the alarm is on or off
    console.log('date1', date1);
    const createTodo = {
      key : keytemp ? keytemp : uuidv4(),
      date: date1,
      todoList: [
        {
          key: keytemp ? keytemp : uuidv4(),
          title: taskText,
          notes: notesText,
          alarm: {
            time: date1,
            isOn: isAlarmSet,
          },
          color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))})`,
        },
      ],
      markedDot: {
        date: date1,
        dots: [
          {
            key: keytemp ? keytemp : uuidv4(),
            color: '#2E66E7',
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };
    
    await updateTodo(createTodo); // Assuming updateTodo expects an array of tasks
    updateCurrentTask(currentDate);
    createTodo1(selectedTask, userEmail1);

    //console.log('createTodo', createTodo);
    console.log('createTodo alarm time', createTodo.todoList[0].key);
  };

  const handleCreateTasks = (parsedData) => {
    // Assuming createEventId is available in your component
    parsedData.forEach((data) => {
      handleCreateEventData(null,data.Name, data.Date);
    });
  };

  const [extractedNames, setExtractedNames] = useState([]);

  const handleNameExtracted = (names) => {
    setExtractedNames(names);
  };
  const [userEmail1, setUserEmail] = useState(null);

  const [email, setEmail] = useState('');
  const handleChange = (text) => {
    setEmail(text);
  };
  const [todoList, setTodoList] = useState([]);
  const [markedDate, setMarkedDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD'
    )}`
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  useEffect(() => {
    handleDeletePreviousDayTask(todo);
  }, [todo, currentDate]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
  
    // Cleanup function to unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
  
  const handleSend = (selectedTask) => {
    // Check if userEmail is available
    if (userEmail1) {
      // User is signed in, userEmail is available
     createTodo1(selectedTask, userEmail1);
    } else {
      console.log('No user signed in.');
    }
    // setEmail('');
  };
  const handleDeletePreviousDayTask = async (oldTodo) => {
    try {
      if (oldTodo && oldTodo.length > 0) {
        const todayDate = `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`;
        const checkDate = moment(todayDate);
  
        for (const item of oldTodo) {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
       
          if (checkedDate > 0) {
             for (const listValue of item.todoList) {
                try {
                   const eventId = listValue.alarm?.createEventAsyncRes?.toString();
                   if (eventId) {
                      await Calendar.deleteEventAsync(eventId);
                   }
                } catch (error) {
                   console.log(error);
                }
             }
             return false;
          }
       }
        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        updateCurrentTask(currentDate);
      }
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
    }
  };
  

  const handleModalVisible = () => {
    setModalVisible(!isModalVisible);
  };

  const updateCurrentTask = async (currentDate) => {
    try {
      if (todo.length > 0 && todo) {
        const markDot = todo.map((item) => item.markedDot);
        const todoLists = todo.filter((item) => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        setMarkedDate(markDot);
        if (todoLists.length !== 0) {
          setTodoList(todoLists[0].todoList);
        } else {
          setTodoList([]);
        }
      }
    } catch (error) {
      console.log('updateCurrentTask', error.message);
    }
  };

  const showDateTimePicker = () => setDateTimePickerVisible(true);

  const hideDateTimePicker = () => setDateTimePickerVisible(false);

  const handleDatePicked = (date) => {
    let prevSelectedTask = JSON.parse(JSON.stringify(selectedTask));
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    let newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
    prevSelectedTask.alarm.time = newModifiedDay;
    setSelectedTask(prevSelectedTask);
    hideDateTimePicker();
  };

  const handleAlarmSet = () => {
    let prevSelectedTask = JSON.parse(JSON.stringify(selectedTask));
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    setSelectedTask(prevSelectedTask);
  };

  const updateAlarm = async () => {
    const calendarId = await createNewCalendar();
    const event = {
      title: selectedTask.title,
      notes: selectedTask.notes,
      startDate: moment(selectedTask?.alarm.time).add(0, 'm').toDate(),
      endDate: moment(selectedTask?.alarm.time).add(5, 'm').toDate(),
      timeZone: 'Asia/Kolkata'
    };

    if (!selectedTask?.alarm.createEventAsyncRes) {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(
          calendarId.toString(),
          event
        );
        let updateTask = JSON.parse(JSON.stringify(selectedTask));
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        setSelectedTask(updateTask);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Calendar.updateEventAsync(
          selectedTask?.alarm.createEventAsyncRes.toString(),
          event
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteAlarm = async () => {
    try {
      if (selectedTask?.alarm.createEventAsyncRes) {
        await Calendar.deleteEventAsync(
          selectedTask?.alarm.createEventAsyncRes
        );
      }
      let updateTask = JSON.parse(JSON.stringify(selectedTask));
      updateTask.alarm.createEventAsyncRes = '';
      setSelectedTask(updateTask);
    } catch (error) {
      console.log('deleteAlarm', error.message);
    }
  };

  const getEvent = async () => {
    if (selectedTask?.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask?.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createNewCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await Calendar.getDefaultCalendarAsync(Calendar.EntityTypes.EVENT)
        : { isLocalAccount: true, name: 'Google Calendar' };

    const newCalendar = {
      title: 'Personal',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId: defaultCalendarSource?.sourceId || undefined,
      source: defaultCalendarSource,
      name: 'internal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: 'personal'
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

  return (
    <Fragment>
      {selectedTask !== null && (
        <Task {...{ setModalVisible, isModalVisible }}>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
            mode="time"
            date={new Date()}
            isDarkModeEnabled
          />
          <View style={styles.taskContainer}>
            <TextInput
              style={styles.title}
              onChangeText={(text) => {
                let prevSelectedTask = JSON.parse(JSON.stringify(selectedTask));
                prevSelectedTask.title = text;
                setSelectedTask(prevSelectedTask);
              }}
              value={selectedTask.title}
              placeholder="What do you need to do?"
            />
            <Text
              style={{
                fontSize: 14,
                color: '#BDC6D8',
                marginVertical: 10
              }}
            >
              Suggestion
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.readBook}>
                <Text style={{ textAlign: 'center', fontSize: 14 }}>
                  Read book
                </Text>
              </View>
              <View style={styles.design}>
                <Text style={{ textAlign: 'center', fontSize: 14 }}>
                  Design
                </Text>
              </View>
              <View style={styles.learn}>
                <Text style={{ textAlign: 'center', fontSize: 14 }}>Learn</Text>
              </View>
            </View>
            <View style={styles.notesContent} />
            <View>
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >
                Notes
              </Text>
              <TextInput
                style={{
                  height: 25,
                  fontSize: 19,
                  marginTop: 3
                }}
                onChangeText={(text) => {
                  let prevSelectedTask = JSON.parse(
                    JSON.stringify(selectedTask)
                  );
                  prevSelectedTask.notes = text;
                  setSelectedTask(prevSelectedTask);
                }}
                value={selectedTask.notes}
                placeholder="Enter notes about the task."
              />
            </View>
            <View style={styles.separator} />
            <View>
              <Text
                style={{
                  color: '#9CAAC4',
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >
                Times
              </Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker()}
                style={{
                  height: 25,
                  marginTop: 3
                }}
              >
                <Text style={{ fontSize: 19 }}>
                  {moment(selectedTask?.alarm?.time || moment()).format(
                    'h:mm A'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >
                  Alarm
                </Text>
                <View
                  style={{
                    height: 25,
                    marginTop: 3
                  }}
                >
                  <Text style={{ fontSize: 19 }}>
                    {moment(selectedTask?.alarm?.time || moment()).format(
                      'h:mm A'
                    )}
                  </Text>
                </View>
              </View>
              <Switch
                value={selectedTask?.alarm?.isOn || false}
                onValueChange={handleAlarmSet}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  handleModalVisible();
                  //console.log('isOn', selectedTask?.alarm.isOn);
                  if (selectedTask?.alarm.isOn) {
                    await updateAlarm();
                  } else {
                    await deleteAlarm();
                  }
                  await updateSelectedTask({
                    date: currentDate,
                    todo: selectedTask
                  });
                  updateCurrentTask(currentDate);
                }}
                style={styles.updateButton}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  UPDATE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  handleModalVisible();
                  deleteAlarm();
                  await deleteSelectedTask({
                    date: currentDate,
                    todo: selectedTask
                  });
                  updateCurrentTask(currentDate);
                }}
                style={styles.deleteButton}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
            <View>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10,marginTop: 10, paddingHorizontal: 10 }}
                  value={email}
                  onChangeText={handleChange}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Button title="Send" onPress={handleSend(selectedTask)}/>
              </View> 
          </View>
        </Task>
      )}
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <CalendarStrip
         // calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200
          }}
          style={{
            height: 150,
            paddingTop: 20,
            paddingBottom: 20
          }}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
          dateNameStyle={{ color: '#BBBBBB' }}
          highlightDateNumberStyle={{
            color: '#fff',
            backgroundColor: '#2E66E7',
            marginTop: 10,
            height: 35,
            width: 35,
            textAlign: 'center',
            borderRadius: 17.5,
            overflow: 'hidden',
            paddingTop: 6,
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          highlightDateNameStyle={{ color: '#2E66E7' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
          datesWhitelist={datesWhitelist}
          iconLeft={require('../../../assets/left-arrow.png')}
          iconRight={require('../../../assets/right-arrow.png')}
          iconContainer={{ flex: 0.1 }}
          // If you get this error => undefined is not an object (evaluating 'datesList[_this.state.numVisibleDays - 1].date')
          // temp: https://github.com/BugiDev/react-native-calendar-strip/issues/303#issuecomment-864510769
          markedDates={markedDate}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            const selectedDate = `${moment(date).format('YYYY')}-${moment(
              date
            ).format('MM')}-${moment(date).format('DD')}`;
            updateCurrentTask(selectedDate);
            setCurrentDate(selectedDate);
            
          }}
        />
        <View style={{    justifyContent: 'center',
    alignItems: 'center'}}>
        <ExcelFetcherComponent
        onNameExtracted={handleNameExtracted}
        onCreateTasks={handleCreateTasks}
      />
      <Text>Extracted Names: {extractedNames && extractedNames.join(', ')}</Text>
        <TouchableOpacity style={styles.signInButton} onPress={handlePress} >
  <Text style={{  color: '#fff'}}>Fetch</Text>
</TouchableOpacity>
</View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateTask', {
              updateCurrentTask: updateCurrentTask,
              currentDate,
              createNewCalendar: createNewCalendar
            })
          }
          style={styles.viewTask}
        >
          <Image
            source={require('../../../assets/plus.png')}
            style={{
              height: 30,
              width: 30
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').height - 170
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 20
            }}
          >
            {todoList.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTask(item);
                  setModalVisible(true);
                  getEvent();
                }}
                key={item.key}
                style={styles.taskListContent}
              >
                <View
                  style={{
                    marginLeft: 13
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: item.color,
                        marginRight: 8
                      }}
                    />                    
                    <Text
                      style={{
                        color: '#554A4C',
                        fontSize: 20,
                        fontWeight: '700'
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 20
                      }}
                    >
                      <Text
                        style={{
                          color: '#BBBBBB',
                          fontSize: 14,
                          marginRight: 5
                        }}
                      >{`${moment(item.alarm.time).format('YYYY')}/${moment(
                        item.alarm.time
                      ).format('MM')}/${moment(item.alarm.time).format(
                        'DD'
                      )}`}</Text>
                      <Text
                        style={{
                          color: '#BBBBBB',
                          fontSize: 14
                        }}
                      >
                        {item.notes}
                      </Text>
                      {/* {console.log('alarm',todoList)} */}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 80,
                    width: 5,
                    backgroundColor: item.color,
                    borderRadius: 5
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}
