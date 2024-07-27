// RemindersScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import database from '@react-native-firebase/database';

const RemindersScreen = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const remindersRef = database().ref('/reminders');

    const onRemindersChange = (snapshot) => {
      if (snapshot.val()) {
        const reminderArray = Object.values(snapshot.val());
        setReminders(reminderArray);
      }
    };

    remindersRef.on('value', onRemindersChange);

    // Clean up the listener when the component unmounts
    return () => remindersRef.off('value', onRemindersChange);
  }, []);

  return (
    <View>
      <Text>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            {/* Render each reminder item */}
            <Text>{item.date}</Text>
            <Text>{item.todoList}</Text>
            {/* Add more details based on your data structure */}
          </View>
        )}
      />
    </View>
  );
};

export default RemindersScreen;
