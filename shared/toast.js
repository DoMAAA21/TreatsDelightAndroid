import Toast from 'react-native-toast-message';
export const successMsg = (message) => {
    Toast.show({
        text1: 'Success',
        text2: `${message}`,
        type: 'success',
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        customStyles: {
            title: {
                fontSize: 30,
                fontWeight: 'bold',
            },
            message: {
                fontSize: 24,
                fontWeight: 'bold',
            },
        },
    });
};

export const topSuccessMsg = (message) => {
    Toast.show({
        text1: `${message}`,
        type: 'tomatoToast',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        customStyles: {
            title: {
                fontSize: 30,
                fontWeight: 'bold',
            },
            message: {
                fontSize: 24,
                fontWeight: 'bold',
            },
        },
    });
};

export const errorMsg = (message) => {
    Toast.show({
        text1: 'Error',
        text2: `${message}`,
        type: 'error',
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        customStyles: {
            title: {
                fontSize: 30,
                fontWeight: 'bold',
            },
            message: {
                fontSize: 24,
                fontWeight: 'bold',
            },
        },
    });
};