import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get('window');


export const style = StyleSheet.create({
    mainHome: {
        alignContent: 'center',
        backgroundColor: '#f2f2ea'
    },
    createButton: {
        borderRadius: 40,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: 'grey',
        width: width * 0.16,
        height: height * .08,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: height * .05,
        right: width * .04,
    },
    searchBar: {
        flexDirection: 'row',
        borderWidth: 2,
        backgroundColor: '#e0e0dd',
        borderRadius: 32,
        margin: height * 0.02,
        height: height * 0.06,
        alignItems: 'center'
    },
    createNote: {
        height: height * 0.06,
        width: width * .5,
        padding: 5
    },
    noteStyleGrid: {
        padding: 5,
        margin: 4,
        width: width * 0.48,
        height: height * 0.2

    },
    noteStyleList: {
        padding: 5,
        margin: 4,
        width: height > width ? width * 0.98 : width * 2,
        height: height > width ? height * 0.20 : height *.25
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    setContentStart: {
        alignItems: 'flex-start',
        paddingTop: 5
    },
    setPadding: {
        padding: 5
    },
    linkText: {
        color: '#2596be'
    },
    largeText: {
        fontSize: 45
    },
    mediumText: {
        fontSize: 30
    },
    smallText: {
        fontSize: 20
    },
    xSmallText: {
        fontSize: 10
    },
    xxSmallText: {
        fontSize: 5
    },
    setFlex1: {
        flex: 1
    },
    setFlex2: {
        flex: 2
    },
    setFlex5: {
        flex: 5
    },
    setFlex7: {
        flex: 7
    },
    setRow: {
        flexDirection: 'row'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    textStart: {
        textAlign: 'left'

    },
    signUpTextInput: {
        marginTop: 10,
        marginBottom: 10
    },
    errorText: {
        color: 'red'
    },
    button: {
        backgroundColor: 'grey',
        borderRadius: 20,
        width: width * .5,
        height: height * .05,
        padding: 5,
        alignSelf: 'center',
        borderWidth: 1
    },
    setMargin: {
        margin: 80
    },
    setSpacing: {
        marginLeft: 5,
        marginRight: 5,
    },
    setMarginTop: {
        margin: 30
    },
    profilePic: {
        borderRadius: 500,
        height: 40,
        width: 40
    },
    largeProfilePic: {
        borderRadius: 100,
        height: '30%',
        width: '30%'
    },
    border: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10
    },
    modal: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: '40%',
        width: '90%',
        borderRadius: 20
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }

})