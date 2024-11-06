import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '799467742576-dr6mfrc2o8n8q5gd32l3ah8iiqj85kei.apps.googleusercontent.com'
});


export async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}


export const onLoginWithGoogle = () => {
    onGoogleButtonPress().then(
        () => console.log('Signed in with Google!')).catch(
            (error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            }).catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })
}
