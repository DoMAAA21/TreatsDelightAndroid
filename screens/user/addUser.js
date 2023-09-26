import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import { Text, Input, Block, Button, Icon } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
const AddUserScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState(''); // Initialize as empty string
    const [religion, setReligion] = useState(''); // Initialize as empty string
    const [role, setRole] = useState(''); // Initialize as empty string
    const [avatar, setAvatar] = useState(null);

    const courses = ['Course 1', 'Course 2', 'Course 3']; // Add your course options here
    const religions = ['Religion 1', 'Religion 2', 'Religion 3']; // Add your religion options here
    const roles = ['Role 1', 'Role 2', 'Role 3']; // Add your role options here

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Access the selected asset through the assets array
            const selectedAsset = result.assets[0];
            setAvatar(selectedAsset.uri);
        }
    };

    const handleSubmit = () => {
        Alert.alert('Form Submitted', 'Form data has been submitted successfully!');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Block style={styles.formContainer}>
                    <Text h5 style={styles.formHeader}>
                        User Registration
                    </Text>
                    <Input
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <Input
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <View style={styles.inputContainer}>
                    <Text>Course</Text>
                    <Picker
                        selectedValue={course}
                        onValueChange={(value) => setCourse(value)}
                    >
                        {courses.map((courseOption) => (
                            <Picker.Item label={courseOption} value={courseOption} key={courseOption} />
                        ))}
                    </Picker>
                    </View>
                    <Picker
                        selectedValue={religion}
                        onValueChange={(value) => setReligion(value)}
                    >
                        {religions.map((religionOption) => (
                            <Picker.Item label={religionOption} value={religionOption} key={religionOption} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={role}
                        onValueChange={(value) => setRole(value)}
                    >
                        {roles.map((roleOption) => (
                            <Picker.Item label={roleOption} value={roleOption} key={roleOption} />
                        ))}
                    </Picker>
                    <View style={styles.imagePickerContainer}>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        ) : null}

                        <Button
                            color="info"
                            style={styles.imagePickerButton}
                            onPress={selectImage}
                        >
                            <Block row middle>
                                <Icon
                                    family="FontAwesome"
                                    size={16}
                                    name="camera"
                                    color="white"
                                    style={{ marginRight: 5 }}
                                />
                                <Text color="white">Choose Avatar</Text>
                            </Block>
                        </Button>

                    </View>
                    <Button
                        round
                        color="success"
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        Submit
                    </Button>
                </Block>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    formContainer: {
        backgroundColor: 'transparent',
    },
    formHeader: {
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    imagePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePickerButton: {
        flex: 1, // Take up half of the available space
        backgroundColor: '#16aec1',
        marginRight: 10, // Add some spacing between the button and the image
    },
    avatar: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
    },
    submitButton: {
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
    },
    inputContainer: {
        inputContainer: 10,
    }
});

export default AddUserScreen;
