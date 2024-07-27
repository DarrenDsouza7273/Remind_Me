// Reminder.js

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Reminder = ({ senderUid, receiverUid }) => {
  const [reminderText, setReminderText] = useState('');

  const sendReminder = async () => {
    try {
      // Add a reminder to Firestore
      await firestore().collection('reminders').add({
        senderUid,
        receiverUid,
        text: reminderText,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      // Clear the input field
      setReminderText('');
    } catch (error) {
      console.error('Error sending reminder:', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter reminder text"
        value={reminderText}
        onChangeText={(text) => setReminderText(text)}
      />
      <Button title="Send Reminder" onPress={sendReminder} />
    </View>
  );
};

export default Reminder;
