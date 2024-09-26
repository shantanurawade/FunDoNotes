import { Text, View, Pressable, Modal, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { style } from '../Components/style';


export function ModalForNote(currentNote: any, onClickNote: any, setOnClickNote: any) {
    return (
        <Modal visible={onClickNote} animationType='fade' >
            <View style={{ height: '200%' }}>
                <View style={{flexDirection:'row'}}>
                    <Pressable onPress={() => {
                        setOnClickNote(false);
                    }}>
                        <Text style={style.largeText}>  {"<"}</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        
                    }}>
                        <Text style={style.largeText}>  {"<"}</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                       
                    }}>
                        <Text style={style.largeText}>  {"<"}</Text>
                    </Pressable>
                </View>
                <TextInput value={currentNote?.title} onChangeText={() => { }} style={[style.mediumText, { borderWidth: 2, width: '100%', paddingTop: 50, alignItems: 'center' }]} ></TextInput>

                <TextInput multiline={true} style={[style.discription, { height: 500, borderWidth: 1 }]}>{currentNote?.description}{'\n'}</TextInput>
                <Text ></Text>
            </View>
        </Modal>
    )
}


