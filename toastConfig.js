import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'

export const toastConfig = {

  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  MessageSuccess: ({text1 }) => (
    <View style={{
      height: 60,
      width: '92%',
      backgroundColor: '#4db4b4',
      borderRadius: 10,
      paddingHorizontal: 20,
      marginTop: 30,
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'row',
      elevation: 5, 
    }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
      <Ionicons name="checkmark-circle-sharp" size={45} color="white" style={{ marginLeft: 'auto' }} />
    </View>
  ),
  MessageError: ({text1 }) => (
    <View style={{
      height: 60,
      width: '92%',
      backgroundColor: '#f3112a',
      borderRadius: 10,
      paddingHorizontal: 20,
      marginTop: 30,
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'row',
      elevation: 5, 
    }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
      <Ionicons name="alert-circle" size={45} color="white" style={{ marginLeft: 'auto' }} />
    </View>
  )
};
